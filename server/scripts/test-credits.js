
import { prisma } from '../src/prisma.js';
import * as creditService from '../src/services/creditService.js';
import { logger } from '../src/config/logger.js';

const testCredits = async () => {
    console.log('--- Starting Credit System Verification ---');

    // 1. Create Test User
    const username = `testuser_${Date.now()}`;
    const user = await prisma.user.create({
        data: {
            username,
            password: 'password123',
            role: 'USER',
            credits: 0
        }
    });
    console.log(`[PASS] Created user ${username} with 0 credits`);

    // 2. Check Credits (Expect False)
    const hasCredits = await creditService.checkCredits(user.id);
    if (!hasCredits) {
        console.log('[PASS] checkCredits returned false for 0 credits');
    } else {
        console.error('[FAIL] checkCredits returned true for 0 credits');
    }

    // 3. Add Credits
    await creditService.addCredits(user.id, 5);
    const userWithCredits = await prisma.user.findUnique({ where: { id: user.id } });
    if (userWithCredits.credits === 5) {
        console.log('[PASS] Added 5 credits. Current credits: 5');
    } else {
        console.error(`[FAIL] Expected 5 credits, got ${userWithCredits.credits}`);
    }

    // 4. Deduct Credit (Expect Success)
    const success = await creditService.deductCredit(user.id);
    if (success) {
        console.log('[PASS] Deducted 1 credit. Success = true');
    } else {
        console.error('[FAIL] Failed to deduct credit');
    }

    // 5. Verify Balance
    const finalUser = await prisma.user.findUnique({ where: { id: user.id } });
    if (finalUser.credits === 4) {
        console.log('[PASS] Final balance is 4 (Correct)');
    } else {
        console.error(`[FAIL] Expected 4 credits, got ${finalUser.credits}`);
    }

    // 6. Cleanup
    await prisma.user.delete({ where: { id: user.id } });
    console.log('[PASS] Cleanup test user');
    console.log('--- Verification Complete ---');
};

testCredits()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
