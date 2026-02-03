import { getSession } from '../services/sessionManager.js';
import * as creditService from '../services/creditService.js';
import { logger } from '../config/logger.js';
import { prisma } from '../prisma.js';

export const sendMessage = async (req, res) => {
    const { sessionId, to, type, content, mediaUrl } = req.body;
    const userId = req.user.id;

    const hasCredits = await creditService.checkCredits(userId);

    // Fetch user to check plan type and expiration
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (user.planType === 'TIME_BASED') {
        if (!user.planExpiresAt || new Date(user.planExpiresAt) < new Date()) {
            return res.status(403).json({ error: 'Subscription expired. Please renew your plan.' });
        }
    } else if (user.planType === 'UNLIMITED') {
        // No checks needed
    } else {
        // PAY_AS_YOU_GO check
        if (!hasCredits) {
            return res.status(403).json({ error: 'Insufficient credits' });
        }
    }

    try {
        const session = await prisma.session.findUnique({ where: { id: sessionId } });
        if (!session || session.userId !== req.user.id) {
            return res.status(403).json({ error: 'Unauthorized: Session not found or does not belong to you' });
        }

        const sock = getSession(sessionId);
        if (!sock) return res.status(404).json({ error: 'Session not connected' });

        const jid = to.includes('@') ? to : `${to}@s.whatsapp.net`;

        if (type === 'TEXT') {
            await sock.sendMessage(jid, { text: content });
        } else if (type === 'IMAGE') {
            await sock.sendMessage(jid, {
                image: { url: mediaUrl },
                caption: content
            });

        }

        res.json({ success: true });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ error: 'Failed to send message' });
    }
};

export const broadcastMessage = async (req, res) => {
    const { sessionId, tag, type, content, mediaUrl } = req.body;
    const userId = req.user.id;

    try {
        const session = await prisma.session.findUnique({ where: { id: sessionId } });
        if (!session || session.userId !== userId) {
            return res.status(403).json({ error: 'Unauthorized: Session not found or does not belong to you' });
        }

        const sock = getSession(sessionId);
        if (!sock) return res.status(404).json({ error: 'Session not connected' });

        // Fetch user to check plan type and expiration
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (user.planType === 'TIME_BASED') {
            if (!user.planExpiresAt || new Date(user.planExpiresAt) < new Date()) {
                return res.status(403).json({ error: 'Subscription expired. Please renew your plan.' });
            }
        }

        const contacts = await prisma.contact.findMany({
            where: {
                userId,
                tags: { contains: tag }
            }
        });

        if (contacts.length === 0) {
            return res.status(404).json({ error: 'No contacts found with this tag' });
        }

        // Create Broadcast Record
        const broadcast = await prisma.broadcast.create({
            data: {
                sessionId,
                tag,
                messageType: type,
                content: content || "",
                mediaUrl,
                total: contacts.length,
                userId,
                status: "PROCESSING"
            }
        });

        // Create Initial Logs
        const logPromises = contacts.map(c =>
            prisma.broadcastLog.create({
                data: {
                    broadcastId: broadcast.id,
                    contactName: c.name,
                    contactPhone: c.phone,
                    status: "PENDING"
                }
            })
        );
        const logs = await Promise.all(logPromises);

        res.json({ message: `Broadcast started for ${contacts.length} contacts`, broadcastId: broadcast.id });

        // Process in background
        (async () => {
            let sentCount = 0;
            let failedCount = 0;

            for (let i = 0; i < contacts.length; i++) {
                const contact = contacts[i];
                const log = logs[i];

                // Check credits before EACH message (only for Pay As You Go and NOT Unlimited)
                if (user.planType !== 'UNLIMITED' && user.planType !== 'TIME_BASED') {
                    const hasCredits = await creditService.checkCredits(userId);
                    if (!hasCredits) {
                        logger.warn(`User ${userId} ran out of credits during broadcast`);
                        await prisma.broadcastLog.update({
                            where: { id: log.id },
                            data: { status: "FAILED", errorMessage: "Insufficient credits" }
                        });
                        failedCount++;
                        continue;
                    }
                }

                try {
                    const jid = contact.phone.includes('@') ? contact.phone : `${contact.phone}@s.whatsapp.net`;

                    if (type === 'TEXT') {
                        await sock.sendMessage(jid, { text: content });
                    } else if (type === 'IMAGE') {
                        await sock.sendMessage(jid, {
                            image: { url: mediaUrl },
                            caption: content
                        });
                    }

                    await creditService.deductCredit(userId);
                    sentCount++;

                    await prisma.broadcastLog.update({
                        where: { id: log.id },
                        data: { status: "SUCCESS" }
                    });

                    // Random delay 2-5s
                    const delay = Math.floor(Math.random() * 3000) + 2000;
                    await new Promise(r => setTimeout(r, delay));

                } catch (err) {
                    logger.error(`Failed to broadcast to ${contact.phone}: ${err.message}`);
                    failedCount++;
                    await prisma.broadcastLog.update({
                        where: { id: log.id },
                        data: { status: "FAILED", errorMessage: err.message }
                    });
                }
            }

            await prisma.broadcast.update({
                where: { id: broadcast.id },
                data: {
                    sent: sentCount,
                    failed: failedCount,
                    status: "COMPLETED"
                }
            });
            logger.info(`Broadcast ${broadcast.id} completed. Sent: ${sentCount}, Failed: ${failedCount}`);
        })();

    } catch (error) {
        logger.error(error);
        if (!res.headersSent) res.status(500).json({ error: 'Failed to start broadcast' });
    }
};

export const getBroadcasts = async (req, res) => {
    try {
        const broadcasts = await prisma.broadcast.findMany({
            where: { userId: req.user.id },
            include: { logs: true },
            orderBy: { cratedAt: 'desc' }
        });
        res.json(broadcasts);
    } catch (error) {
        logger.error(error);
        res.status(500).json({ error: 'Failed to fetch broadcasts' });
    }
};

export const retryBroadcast = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const broadcast = await prisma.broadcast.findUnique({
            where: { id: parseInt(id) },
            include: { logs: { where: { status: 'FAILED' } } }
        });

        if (!broadcast || broadcast.userId !== userId) {
            return res.status(404).json({ error: 'Broadcast not found' });
        }

        if (broadcast.logs.length === 0) {
            return res.status(400).json({ error: 'No failed messages to retry' });
        }

        const sock = getSession(broadcast.sessionId);
        if (!sock) return res.status(404).json({ error: 'Session not connected' });

        res.json({ message: `Retrying ${broadcast.logs.length} failed messages` });

        // Process Retry Background
        (async () => {
            let retriedSent = 0;
            let retriedFailed = 0;

            for (const log of broadcast.logs) {
                try {
                    const jid = log.contactPhone.includes('@') ? log.contactPhone : `${log.contactPhone}@s.whatsapp.net`;

                    if (broadcast.messageType === 'TEXT') {
                        await sock.sendMessage(jid, { text: broadcast.content });
                    } else if (broadcast.messageType === 'IMAGE') {
                        await sock.sendMessage(jid, {
                            image: { url: broadcast.mediaUrl },
                            caption: broadcast.content
                        });
                    }

                    await creditService.deductCredit(userId);
                    retriedSent++;

                    await prisma.broadcastLog.update({
                        where: { id: log.id },
                        data: { status: "SUCCESS", errorMessage: null }
                    });

                    const delay = Math.floor(Math.random() * 3000) + 2000;
                    await new Promise(r => setTimeout(r, delay));

                } catch (err) {
                    retriedFailed++;
                    await prisma.broadcastLog.update({
                        where: { id: log.id },
                        data: { status: "FAILED", errorMessage: err.message }
                    });
                }
            }

            // Update totals
            await prisma.broadcast.update({
                where: { id: broadcast.id },
                data: {
                    sent: broadcast.sent + retriedSent,
                    failed: broadcast.failed - retriedSent // Re-calculated based on what became success
                }
            });

        })();

    } catch (error) {
        logger.error(error);
        res.status(500).json({ error: 'Failed to retry broadcast' });
    }
};
