
import { prisma } from '../src/prisma.js';
import bcrypt from 'bcryptjs';

const createAdmin = async () => {
    const password = await bcrypt.hash('admin', 10);

    // Upsert admin user
    const user = await prisma.user.upsert({
        where: { username: 'admin' },
        update: {
            password,
            role: 'ADMIN',
            credits: 999999
        },
        create: {
            username: 'admin',
            password,
            role: 'ADMIN',
            credits: 999999
        }
    });

    console.log(`Admin user created/updated.`);
    console.log(`Username: ${user.username}`);
    console.log(`Password: admin`);
    console.log(`Credits: ${user.credits}`);
};

createAdmin()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
