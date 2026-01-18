
import { prisma } from '../prisma.js';
import { logger } from '../config/logger.js';

/**
 * Check if a user has enough credits.
 * @param {number} userId 
 * @param {number} amount 
 * @returns {Promise<boolean>}
 */
export const checkCredits = async (userId, count = 1) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { credits: true, messageCost: true, planExpiresAt: true, planType: true }
        });
        if (!user) return false;

        if (user.planExpiresAt && new Date() > new Date(user.planExpiresAt)) {
            logger.warn(`User ${userId} plan expired at ${user.planExpiresAt}`);
            return false;
        }

        // Unlimited credits for subscription plans
        if (user.planType === 'TIME_BASED') {
            return true;
        }

        const cost = count * (user.messageCost || 1);
        return user.credits >= cost;
    } catch (error) {
        logger.error(`Error checking credits for user ${userId}: ${error.message}`);
        return false;
    }
};

/**
 * Deduct credits from a user.
 * @param {number} userId 
 * @param {number} amount 
 * @returns {Promise<boolean>} success
 */
export const deductCredit = async (userId, count = 1) => {
    try {
        const user = await prisma.user.findUnique({ where: { id: userId } });

        // Skip deduction for subscription plans
        if (user?.planType === 'TIME_BASED') {
            return true;
        }

        const cost = count * (user?.messageCost || 1);

        if (!user || user.credits < cost) return false;

        await prisma.user.update({
            where: { id: userId },
            data: { credits: { decrement: cost } }
        });
        return true;
    } catch (error) {
        logger.error(`Error deducting credits for user ${userId}: ${error.message}`);
        return false;
    }
};

/**
 * Add credits to a user.
 * @param {number} userId 
 * @param {number} amount 
 * @returns {Promise<object>} updated user
 */
export const addCredits = async (userId, amount) => {
    return await prisma.user.update({
        where: { id: userId },
        data: { credits: { increment: amount } }
    });
};
