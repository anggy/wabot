
import { PrismaClient } from '@prisma/client';
import { processMessage } from './src/services/ruleEngine.js';
// We won't mock aiService directly due to ESM const export issues. 
// Instead we will rely on integration testing:
// Since we set a fake AI key, the real aiService will attempt to call OpenAI and fail (401).
// We can assume success if we see the attempt in the flow or if we don't crash.
// For a true unit test we'd need dependency injection, but for this quick verify, 
// checking if rule engine *attempts* to use it is enough.

const prisma = new PrismaClient();

// Mock Socket
const mockSock = {
    sendMessage: async (jid, content) => {
        console.log(`[MOCK SOCK] Sending to ${jid}:`, content);
    }
};

async function testAiRule() {
    console.log('--- Testing AI Rule Flow (Integration) ---');

    // 1. Setup User
    const user = await prisma.user.upsert({
        where: { username: 'ai_rule_test_user' },
        update: {
            aiApiKey: 'sk-rule-test-key-invalid',
            credits: 100
        },
        create: {
            username: 'ai_rule_test_user',
            password: 'password',
            role: 'USER',
            aiApiKey: 'sk-rule-test-key-invalid',
            credits: 100
        }
    });

    // 2. Create AI Rule
    const trigger = 'ai_rule_trigger_' + Math.floor(Math.random() * 1000);
    const rule = await prisma.rule.create({
        data: {
            name: 'Test AI Rule',
            triggerType: 'KEYWORD',
            triggerValue: trigger,
            actionType: 'AI_REPLY',
            responseContent: 'You are a test bot for rules.',
            userId: user.id
        }
    });
    console.log(`Created Rule: ${rule.id} (Trigger: ${trigger})`);

    // 3. Setup Session
    const session = await prisma.session.upsert({
        where: { id: 'test-session-ai-rule' },
        update: { userId: user.id },
        create: {
            id: 'test-session-ai-rule',
            name: 'Test Session AI Rule',
            userId: user.id,
            status: 'CONNECTED'
        }
    });

    // 4. Simulate Message
    const mockMsg = {
        key: { remoteJid: '1234567890@s.whatsapp.net' },
        message: { conversation: `Hello ${trigger} world` }
    };

    console.log(`Simulating incoming message: "${mockMsg.message.conversation}"`);
    console.log("Expected behavior: Rule matches, fetches user key, tries to call OpenAI, likely logs 401/error (since key is fake), but does NOT crash.");

    await processMessage(session.id, mockMsg, mockSock);

    console.log("Process complete. Check logs above for 'Generating AI response' or API errors.");

    // Cleanup
    await prisma.rule.delete({ where: { id: rule.id } });
}

testAiRule()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });
