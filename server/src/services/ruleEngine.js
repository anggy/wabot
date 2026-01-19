import { prisma } from '../prisma.js';
import { logger } from '../config/logger.js';
import { jidNormalizedUser } from '@whiskeysockets/baileys';
import * as creditService from './creditService.js';
import * as aiService from './aiService.js';

export const processMessage = async (sessionId, message, sock) => {
    try {
        const text = message.message?.conversation || message.message?.extendedTextMessage?.text || message.message?.imageMessage?.caption || "";

        if (!text) return;

        const session = await prisma.session.findUnique({ where: { id: sessionId } });
        if (!session) return; // Should not happen if processing message

        const rules = await prisma.rule.findMany({
            where: {
                isActive: true,
                userId: session.userId,
                OR: [
                    { sessionId: sessionId },
                    { sessionId: null }
                ]
            }
        });

        for (const rule of rules) {
            let matched = false;

            if (rule.triggerType === 'KEYWORD') {
                // FALLBACK: Handle case where user selected KEYWORD but typed "On Mention (Tag Bot)"
                if (rule.triggerValue.toLowerCase() === 'on mention (tag bot)') {
                    const mentions = message.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
                    const botJid = jidNormalizedUser(sock.user.id);
                    if (mentions.includes(botJid)) matched = true;
                } else {
                    if (text.toLowerCase().includes(rule.triggerValue.toLowerCase())) matched = true;
                }
            } else if (rule.triggerType === 'ALL') {
                matched = true;
            } else if (rule.triggerType === 'REGEX') {
                try {
                    const regex = new RegExp(rule.triggerValue, 'i');
                    if (regex.test(text)) matched = true;
                } catch (e) {
                    logger.error(`Invalid Regex for rule ${rule.id}: ${e.message}`);
                }
            } else if (rule.triggerType === 'MENTION') {
                const mentions = message.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
                const botJid = jidNormalizedUser(sock.user.id);
                if (mentions.includes(botJid)) matched = true;
            }

            if (matched) {
                logger.info(`Rule ${rule.id} matched for session ${sessionId}`);
                executeAction(rule, sessionId, message, sock);
                return true;
            }
        }
        return false;
    } catch (error) {
        logger.error(`Error processing message: ${error.message}`);
        return false;
    }
};

const executeAction = async (rule, sessionId, originalMessage, sock) => {
    // Check credits first
    const hasCredits = await creditService.checkCredits(rule.userId);
    if (!hasCredits) {
        logger.warn(`Rule ${rule.id} execution skipped: User ${rule.userId} has insufficient credits`);
        return;
    }

    if (rule.actionType === 'API_CALL' && rule.apiUrl) {
        try {
            let url = rule.apiUrl;
            const text = originalMessage.message?.conversation || originalMessage.message?.extendedTextMessage?.text || originalMessage.message?.imageMessage?.caption || "";

            // Handle Dynamic Parameters for REGEX
            if (rule.triggerType === 'REGEX') {
                try {
                    const regex = new RegExp(rule.triggerValue, 'i');
                    const matches = text.match(regex);
                    if (matches) {
                        matches.forEach((match, index) => {
                            url = url.replace(new RegExp(`\\{${index}\\}`, 'g'), match);
                        });
                    }
                } catch (e) {
                    logger.error(`Regex replacement error: ${e.message}`);
                }
            }

            const payload = {
                ...JSON.parse(rule.apiPayload || "{}"),
                sessionId,
                message: originalMessage,
                trigger: rule.triggerValue
            };

            const method = rule.apiMethod || 'POST';
            const options = {
                method,
                headers: { 'Content-Type': 'application/json' }
            };

            if (method !== 'GET' && method !== 'HEAD') {
                options.body = JSON.stringify(payload);
            }

            const response = await fetch(url, options); // Use dynamic URL

            const data = await response.json();
            logger.info(`Rule ${rule.id} API executed to ${url}. Status: ${response.status}`);

            // Optional: If the API returns a 'message' field, reply with it (Fonnte-like behavior)
            if (data && data.message) {
                const jid = originalMessage.key.remoteJid;
                await sock.sendMessage(jid, { text: typeof data.message === 'string' ? data.message : JSON.stringify(data.message) });
                await creditService.deductCredit(rule.userId);
            }

        } catch (error) {
            logger.error(`Rule ${rule.id} execution failed: ${error.message}`);
        }
    } else if (rule.actionType === 'RESPONSE' && rule.responseContent) {
        try {
            const jid = originalMessage.key.remoteJid;

            if (rule.responseMediaType === 'IMAGE' && rule.responseMediaUrl) {
                await sock.sendMessage(jid, {
                    image: { url: rule.responseMediaUrl },
                    caption: rule.responseContent
                });
            } else {
                await sock.sendMessage(jid, { text: rule.responseContent });
            }

            await creditService.deductCredit(rule.userId);

            logger.info(`Rule ${rule.id} auto-reply sent to ${jid}`);
        } catch (error) {
            logger.error(`Rule ${rule.id} auto-reply failed: ${error.message}`);
        }
    } else if (rule.actionType === 'AI_REPLY') {
        try {
            const jid = originalMessage.key.remoteJid;

            // Fetch User's API Key
            const user = await prisma.user.findUnique({
                where: { id: rule.userId },
                select: { aiApiKey: true, isAiEnabled: true }
            });

            if (!user?.aiApiKey) {
                logger.warn(`Rule ${rule.id} skipped: User ${rule.userId} missing AI API Key`);
                return;
            }

            logger.info(`Generating AI response for rule ${rule.id} (System Prompt: ${rule.responseContent?.substring(0, 20)}...)`);

            const userMessage = originalMessage.message?.conversation || originalMessage.message?.extendedTextMessage?.text || "";
            const response = await aiService.generateResponse(user.aiApiKey, rule.responseContent, userMessage);

            if (response) {
                await sock.sendMessage(jid, { text: response });
                await creditService.deductCredit(rule.userId);
                logger.info(`Rule ${rule.id} AI response sent to ${jid}`);
            } else {
                logger.warn(`Rule ${rule.id} AI response generation failed (returned null)`);
            }
        } catch (error) {
            logger.error(`Rule ${rule.id} AI execution failed: ${error.message}`);
        }
    }
};
