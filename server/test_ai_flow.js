
import { PrismaClient } from '@prisma/client';
import { generateResponse } from './src/services/aiService.js';

const prisma = new PrismaClient();

async function testAiFlow() {
    console.log('--- Testing AI Auto-Response Flow ---');

    // 1. Setup User with AI enabled
    console.log('1. Setting up user with AI fields...');
    const user = await prisma.user.upsert({
        where: { username: 'ai_test_user' },
        update: {
            isAiEnabled: true,
            aiApiKey: 'sk-mock-key',
            aiBriefing: 'You are a test bot.'
        },
        create: {
            username: 'ai_test_user',
            password: 'password',
            role: 'USER',
            isAiEnabled: true,
            aiApiKey: 'sk-mock-key',
            aiBriefing: 'You are a test bot.'
        }
    });

    console.log('   User created/updated.');
    console.log(`   AI Enabled: ${user.isAiEnabled}`);
    console.log(`   API Key: ${user.aiApiKey}`);
    console.log(`   Briefing: ${user.aiBriefing}`);

    if (user.isAiEnabled && user.aiApiKey === 'sk-mock-key') {
        console.log('   SUCCESS: AI fields persisted correctly.');
    } else {
        console.error('   FAILURE: AI fields persistence failed.');
    }

    // 2. Test AI Service with Mock Key (Expect graceful failure)
    console.log('\n2. Testing AI Service with Mock Key...');
    const response = await generateResponse(user.aiApiKey, user.aiBriefing, "Hello AI");

    console.log(`   Response (should be null as key is invalid): ${response}`);

    if (response === null) {
        console.log('   SUCCESS: AI Service handled invalid key gracefully.');
    } else {
        console.log('   WARNING: Unexpected response from AI Service.');
    }
}

testAiFlow()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });
