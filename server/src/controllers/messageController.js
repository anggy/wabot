import { getSession } from '../services/sessionManager.js';
import * as creditService from '../services/creditService.js';
import { logger } from '../config/logger.js';
import { prisma } from '../prisma.js';

export const sendMessage = async (req, res) => {
    const { sessionId, to, type, content, mediaUrl } = req.body;
    const userId = req.user.id;

    const hasCredits = await creditService.checkCredits(userId);
    if (!hasCredits) {
        return res.status(403).json({ error: 'Insufficient credits' });
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

        await creditService.deductCredit(userId);
        res.json({ success: true });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ error: 'Failed to send message' });
    }
};
