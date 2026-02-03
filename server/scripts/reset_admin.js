
import { prisma } from '../src/prisma.js';
import bcrypt from 'bcryptjs';

async function resetAdmin() {
    console.log("Resetting admin password...");
    const hashedPassword = await bcrypt.hash('password123', 10);

    await prisma.user.updateMany({
        where: { username: 'admin' },
        data: { password: hashedPassword }
    });

    console.log("✅ Admin password reset to: password123");
}

resetAdmin()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
