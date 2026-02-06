
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const columns = await prisma.$queryRaw`PRAGMA table_info(AiCredential);`;
        const hasRefreshInterval = columns.some(c => c.name === 'refreshInterval');
        console.log('refreshInterval exists:', hasRefreshInterval);
        if (!hasRefreshInterval) {
            console.log('Columns found:', columns.map(c => c.name));
        }
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
