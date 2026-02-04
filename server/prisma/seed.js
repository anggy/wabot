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
            const hashedPassword = await bcrypt.hash('adminpassword', 10);
            await prisma.user.create({
                data: {
                    username: 'admin',
                    password: hashedPassword,
                    role: 'ADMIN',
                    planType: 'UNLIMITED',
                    credits: 99999,
                },
            });
            console.log('Default admin user created: admin / adminpassword');
        } else {
            console.log('Admin user exists. Updating password to ensure access...');
            const hashedPassword = await bcrypt.hash('adminpassword', 10);
            await prisma.user.update({
                where: { username: 'admin' },
                data: { password: hashedPassword }
            });
            console.log('Admin password reset to: adminpassword');
        }
    } catch (e) {
        console.error(e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
