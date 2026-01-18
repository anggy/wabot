import cron from 'node-cron';
import { prisma } from '../prisma.js';
import { logger } from '../config/logger.js';
import { getSession } from './sessionManager.js';
import * as creditService from './creditService.js';

const jobs = new Map();

export const initScheduler = async () => {
    const schedules = await prisma.schedule.findMany({ where: { isActive: true } });
    schedules.forEach(scheduleJob);
    logger.info(`Initialized ${schedules.length} schedules`);
};

export const scheduleJob = (schedule) => {
    if (jobs.has(schedule.id)) {
        jobs.get(schedule.id).stop();
    }

    if (!schedule.isActive) return;

    try {
        const task = cron.schedule(schedule.cronExpression, async () => {
            logger.info(`Executing schedule ${schedule.id}`);
            try {
                const sock = getSession(schedule.sessionId);
                if (!sock) {
                    logger.warn(`Session ${schedule.sessionId} not found for schedule ${schedule.id}`);
                    return;
                }

                const hasCredits = await creditService.checkCredits(schedule.userId);
                if (!hasCredits) {
                    logger.warn(`Skipping schedule ${schedule.id}: User ${schedule.userId} has insufficient credits`);
                    return;
                }

                // Check connection status
                // Baileys sock usually handles queuing, but if disconnected for long, might fail.

                const jid = schedule.recipient.includes('@') ? schedule.recipient : `${schedule.recipient}@s.whatsapp.net`; // Simple formatting

                if (schedule.messageType === 'TEXT') {
                    await sock.sendMessage(jid, { text: schedule.content });
                } else if (schedule.messageType === 'IMAGE' && schedule.mediaUrl) {
                    await sock.sendMessage(jid, {
                        image: { url: schedule.mediaUrl },
                        caption: schedule.content
                    });
                }

                await creditService.deductCredit(schedule.userId);

                await prisma.schedule.update({
                    where: { id: schedule.id },
                    data: { lastRun: new Date() }
                });

            } catch (error) {
                logger.error(`Failed to execute schedule ${schedule.id}: ${error.message}`);
            }
        });

        jobs.set(schedule.id, task);
    } catch (error) {
        logger.error(`Invalid cron expression for schedule ${schedule.id}: ${schedule.cronExpression}`);
    }
};

export const removeJob = (id) => {
    if (jobs.has(id)) {
        jobs.get(id).stop();
        jobs.delete(id);
    }
};
