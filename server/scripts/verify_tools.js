
import { prisma } from '../src/prisma.js';
import { createTool, getTools, deleteTool } from '../src/controllers/aiController.js';
import { getToolsForUser, executeTool } from '../src/services/toolManager.js';

async function main() {
    console.log("--- Starting AI Tool Verification ---");

    // 1. Create a dummy user if not exists (ID 1 is default in many places)
    let user = await prisma.user.findUnique({ where: { id: 1 } });
    if (!user) {
        console.log("Creating dummy user...");
        user = await prisma.user.create({
            data: {
                username: "test_admin",
                password: "hashedpassword",
                role: "ADMIN",
                aiProvider: "gemini",
                isAiEnabled: true
            }
        });
    }

    // 2. Clear existing tools for test
    await prisma.aiTool.deleteMany({ where: { name: "Test_Weather_API" } });

    // 3. Create a Tool directly via Prisma (simulating Controller)
    console.log("Creating Test Tool...");
    await prisma.aiTool.create({
        data: {
            userId: user.id,
            name: "Test_Weather_API",
            description: "Get weather for a city",
            method: "GET",
            baseUrl: "https://jsonplaceholder.typicode.com", // Dummy mock
            endpoint: "/todos/{id}", // Using jsonplaceholder as a mock
            parameters: JSON.stringify({
                type: "object",
                properties: {
                    id: { type: "string", description: "Todo ID (simulating city)" }
                },
                required: ["id"]
            })
        }
    });

    // 4. Test toolManager.getToolsForUser
    console.log("Fetching tools for user...");
    const tools = await getToolsForUser(user.id);
    console.log(`Found ${tools.length} tools.`);
    const myTool = tools.find(t => t.name === "Test_Weather_API");

    if (myTool) {
        console.log("✅ Tool 'Test_Weather_API' found in toolManager.");
    } else {
        console.error("❌ Tool not found!");
        process.exit(1);
    }

    // 5. Test toolManager.executeTool
    console.log("Executing Tool (Mock API Call)...");
    const result = await executeTool(myTool._internal, { id: "1" });

    if (result.status === 200 && result.data.id === 1) {
        console.log("✅ Tool Execution Successful!");
        console.log("Result Data:", result.data);
    } else {
        console.error("❌ Tool Execution Failed:", result);
    }

    console.log("--- Verification Complete ---");
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
