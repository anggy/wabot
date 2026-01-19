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

        // Find contacts with the partial tag match (since tags is a string, e.g. "tag1,tag2")
        const contacts = await prisma.contact.findMany({
            where: {
                userId,
                tags: { contains: tag }
            }
        });

        if (contacts.length === 0) {
            return res.status(404).json({ error: 'No contacts found with this tag' });
        }

        // Fetch user to check plan type and expiration
        const user = await prisma.user.findUnique({ where: { id: userId } });

        if (user.planType === 'TIME_BASED') {
            if (!user.planExpiresAt || new Date(user.planExpiresAt) < new Date()) {
                return res.status(403).json({ error: 'Subscription expired. Please renew your plan.' });
            }
        }

        let sentCount = 0;
        let failedCount = 0;

        // Process in background to avoid timeout, but for now we'll do a simple loop
        // Ideally this should be a job queue. For MVP, we'll confirm start.

        // We will send immediately but response might timeout if list is huge. 
        // Better to return success and process async, OR limit list size.
        // For simplicity in this iteration, we keep it simple but warn user in UI.

        res.json({ message: `Broadcast started for ${contacts.length} contacts`, total: contacts.length });

        (async () => {
            for (const contact of contacts) {
                // Check credits before EACH message (only for Pay As You Go)
                if (user.planType === 'PAY_AS_YOU_GO') {
                    const hasCredits = await creditService.checkCredits(userId);
                    if (!hasCredits) {
                        logger.warn(`User ${userId} ran out of credits during broadcast`);
                        break;
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

                    if (user.planType === 'PAY_AS_YOU_GO') {
                        await creditService.deductCredit(userId);
                    }
                    sentCount++;

                    // Random delay 2-5s
                    const delay = Math.floor(Math.random() * 3000) + 2000;
                    await new Promise(r => setTimeout(r, delay));

                } catch (err) {
                    logger.error(`Failed to broadcast to ${contact.phone}: ${err.message}`);
                    failedCount++;
                }
            }
            logger.info(`Broadcast completed. Sent: ${sentCount}, Failed: ${failedCount}`);
        })();

    } catch (error) {
        logger.error(error);
        if (!res.headersSent) res.status(500).json({ error: 'Failed to start broadcast' });
    }
};
