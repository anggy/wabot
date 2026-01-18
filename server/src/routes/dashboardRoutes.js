import express from 'express';
import { prisma } from '../prisma.js';

const router = express.Router();

router.get('/stats', async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Get user session IDs
        const sessions = await prisma.session.findMany({
            where: { userId: req.user.id },
            select: { id: true }
        });
        const sessionIds = sessions.map(s => s.id);

        const stats = {
            totalSessions: await prisma.session.count({
                where: { userId: req.user.id }
            }),
            activeSessions: await prisma.session.count({ where: { userId: req.user.id, status: 'CONNECTED' } }),
            totalMessages: await prisma.messageLog.count({
                where: { sessionId: { in: sessionIds } }
            }),
            messagesSentToday: await prisma.messageLog.count({
                where: {
                    sessionId: { in: sessionIds },
                    createdAt: { gte: today },
                    status: 'SENT'
                }
            }),
            messagesReceivedToday: await prisma.messageLog.count({
                where: {
                    sessionId: { in: sessionIds },
                    createdAt: { gte: today },
                    status: 'RECEIVED'
                }
            }),
            totalContacts: await prisma.contact.count({
                where: { userId: req.user.id }
            }),
            activeRules: await prisma.rule.count({ where: { userId: req.user.id, isActive: true } }),
            credits: (await prisma.user.findUnique({ where: { id: req.user.id }, select: { credits: true } }))?.credits || 0
        };
        res.json(stats);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.get('/history', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        // Force filter by user sessions
        const userSessions = await prisma.session.findMany({
            where: { userId: req.user.id },
            select: { id: true }
        });
        const userSessionIds = userSessions.map(s => s.id);

        const where = {
            sessionId: { in: userSessionIds }
        };

        // If specific session requested, ensure it belongs to user
        if (req.query.sessionId) {
            if (userSessionIds.includes(req.query.sessionId)) {
                where.sessionId = req.query.sessionId;
            } else {
                return res.json({ data: [], pagination: { total: 0, page, limit, totalPages: 0 } });
            }
        }

        if (req.query.direction) where.direction = req.query.direction;

        const logs = await prisma.messageLog.findMany({
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
            where
        });

        const total = await prisma.messageLog.count({ where });

        res.json({
            data: logs,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

export default router;
