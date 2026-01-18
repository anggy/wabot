import { makeWASocket, useMultiFileAuthState, DisconnectReason, Browsers } from '@whiskeysockets/baileys';
import { prisma } from '../prisma.js';
import { logger } from '../config/logger.js';
import fs from 'fs';
import path from 'path';
import QRCode from 'qrcode';
import * as ruleEngine from './ruleEngine.js';
import * as aiService from './aiService.js';

const sessions = new Map();

const activeQRs = new Map();

export const startSession = async (sessionId) => {
    if (sessions.has(sessionId)) {
        return sessions.get(sessionId);
    }

    const sessionDir = path.join('sessions', sessionId);
    if (!fs.existsSync(sessionDir)) {
        fs.mkdirSync(sessionDir, { recursive: true });
    }

    const { state, saveCreds } = await useMultiFileAuthState(sessionDir);

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false,
        browser: Browsers.macOS('Desktop'),
        syncFullHistory: false
    });

    sessions.set(sessionId, sock);

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr) {
            logger.info(`Generating QR for session ${sessionId}`);
            // Generate QR code and emit
            const qrImage = await QRCode.toDataURL(qr);
            activeQRs.set(sessionId, qrImage);
            global.io.emit('session-qr', { sessionId, qr: qrImage });

            await prisma.session.update({
                where: { id: sessionId },
                data: { status: 'CONNECTING' }
            });
        }

        if (connection === 'close') {
            const statusCode = (lastDisconnect?.error)?.output?.statusCode;
            const shouldReconnect = statusCode !== DisconnectReason.loggedOut;
            logger.error(`Session ${sessionId} closed. StatusCode: ${statusCode}, Error: ${lastDisconnect?.error?.message}. Reconnecting: ${shouldReconnect}`);

            // Always remove the closed session from memory
            sessions.delete(sessionId);
            activeQRs.delete(sessionId);

            if (shouldReconnect) {
                startSession(sessionId);
            } else {
                await prisma.session.update({
                    where: { id: sessionId },
                    data: { status: 'DISCONNECTED' }
                });
            }
        } else if (connection === 'open') {
            logger.info(`Session ${sessionId} opened successfully`);
            activeQRs.delete(sessionId);
            await prisma.session.update({
                where: { id: sessionId },
                data: { status: 'CONNECTED' }
            });
            global.io.emit('session-status', { sessionId, status: 'CONNECTED' });
        }
    });



    sock.ev.on('messages.upsert', async (m) => {
        if (m.type === 'notify' || m.type === 'append') {
            for (const msg of m.messages) {
                try {
                    const isFromMe = msg.key.fromMe;
                    const content = msg.message?.conversation ||
                        msg.message?.extendedTextMessage?.text ||
                        msg.message?.imageMessage?.caption ||
                        "";

                    if (!content) continue; // Skip empty/protocol messages

                    const remoteJid = msg.key.remoteJid;

                    await prisma.messageLog.create({
                        data: {
                            sessionId,
                            direction: isFromMe ? 'OUT' : 'IN',
                            from: isFromMe ? sessionId : remoteJid,
                            to: isFromMe ? remoteJid : sessionId,
                            content,
                            status: isFromMe ? 'SENT' : 'RECEIVED'
                        }
                    });

                    // Handle incoming messages for Rules
                    if (!isFromMe) {
                        await ruleEngine.processMessage(sessionId, msg, sock);
                    }

                    // Auto-Read Message
                    await sock.readMessages([msg.key]);

                } catch (err) {
                    logger.error(`Failed to log message: ${err.message}`);
                }
            }
        }
    });

    return sock;
};

export const getSession = (sessionId) => {
    return sessions.get(sessionId);
};

export const getQR = (sessionId) => {
    return activeQRs.get(sessionId);
};

export const deleteSession = async (sessionId) => {
    const sock = sessions.get(sessionId);
    if (sock) {
        sock.ev.removeAllListeners('connection.update');
        sock.end(undefined);
        sessions.delete(sessionId);
    }
    activeQRs.delete(sessionId);

    const sessionDir = path.join('sessions', sessionId);
    if (fs.existsSync(sessionDir)) {
        fs.rmSync(sessionDir, { recursive: true, force: true });
    }

    await prisma.session.update({
        where: { id: sessionId },
        data: { status: 'DISCONNECTED' }
    });
};

export const getGroups = async (sessionId) => {
    const sock = sessions.get(sessionId);
    if (!sock) throw new Error('Session not found');

    const groups = await sock.groupFetchAllParticipating();
    return Object.values(groups);
};

export const initSessions = async () => {
    logger.info('Initializing sessions...');
    const sessions = await prisma.session.findMany();
    for (const session of sessions) {
        if (session.status !== 'DISCONNECTED') {
            logger.info(`Resuming session ${session.id}`);
            startSession(session.id);
        }
    }
};
