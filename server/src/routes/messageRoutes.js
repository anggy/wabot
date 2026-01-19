import express from 'express';
import * as messageController from '../controllers/messageController.js';

const router = express.Router();

/**
 * @swagger
 * /api/messages/send:
 *   post:
 *     summary: Send a WhatsApp message
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sessionId
 *               - to
 *               - type
 *               - content
 *             properties:
 *               sessionId:
 *                 type: string
 *               to:
 *                 type: string
 *                 description: Phone number or JID
 *               type:
 *                 type: string
 *                 enum: [TEXT, IMAGE]
 *               content:
 *                 type: string
 *               mediaUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Message sent successfully
 *       403:
 *         description: Unauthorized session access
 *       404:
 *         description: Session not connected
 */
router.post('/send', messageController.sendMessage);

/**
 * @swagger
 * /api/messages/broadcast:
 *   post:
 *     summary: Broadcast a message to contacts with a specific tag
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sessionId
 *               - tag
 *               - type
 *               - content
 *             properties:
 *               sessionId:
 *                 type: string
 *               tag:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [TEXT, IMAGE]
 *               content:
 *                 type: string
 *               mediaUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Broadcast started
 *       404:
 *         description: No contacts found
 */
router.post('/broadcast', messageController.broadcastMessage);


export default router;
