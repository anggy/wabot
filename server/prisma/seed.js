import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    try {
        const adminExists = await prisma.user.findUnique({
            where: { username: 'admin' },
        });

        if (!adminExists) {
            console.log('Creating default admin user...');
            const hashedPassword = await bcrypt.hash('password123', 10);
            await prisma.user.create({
                data: {
                    username: 'admin',
                    password: hashedPassword,
                    role: 'ADMIN',
                },
            });
            console.log('Default admin user created: admin / password123');
        } else {
            console.log('Admin user already exists.');
        }
    } catch (e) {
        console.error(e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
