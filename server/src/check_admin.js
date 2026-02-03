import { prisma } from './prisma.js';

async function checkAdmin() {
    const users = await prisma.user.findMany();
    console.log('Total users:', users.length);
    users.forEach(u => console.log(`- [${u.id}] ${u.username} (${u.role}) - Active: ${u.isActive}`));
}

checkAdmin()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
