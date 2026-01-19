import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function cleanup() {
    try {
        console.log('Starting cleanup...');

        // 1. Delete ALL Sessions (as requested "clear semua session")
        const deletedSessions = await prisma.session.deleteMany({});
        console.log(`Deleted ${deletedSessions.count} sessions.`);

        // 2. Find Admin User to keep
        const adminUser = await prisma.user.findFirst({
            where: { role: 'ADMIN' }
        });

        if (!adminUser) {
            console.error('No ADMIN user found! Aborting user cleanup to prevent total lockout.');
            return;
        }

        console.log(`Found ADMIN user: ${adminUser.username} (ID: ${adminUser.id}). Keeping this user.`);

        // 3. Delete all other users and their related data
        // Due to foreign keys, we should delete related data first if cascades aren't fully set up, 
        // but Prisma deleteMany on relations is easy.

        const nonAdminUsers = await prisma.user.findMany({
            where: {
                NOT: {
                    role: 'ADMIN'
                }
            },
            select: { id: true, username: true }
        });

        const nonAdminUserIds = nonAdminUsers.map(u => u.id);
        console.log(`Found ${nonAdminUserIds.length} non-admin users to delete: ${nonAdminUsers.map(u => u.username).join(', ')}`);

        if (nonAdminUserIds.length > 0) {
            // Delete related data for non-admin users
            await prisma.rule.deleteMany({ where: { userId: { in: nonAdminUserIds } } });
            await prisma.schedule.deleteMany({ where: { userId: { in: nonAdminUserIds } } });
            await prisma.contact.deleteMany({ where: { userId: { in: nonAdminUserIds } } });
            // Sessions were already deleted globally above.

            // Finally delete the users
            const deletedUsers = await prisma.user.deleteMany({
                where: {
                    id: { in: nonAdminUserIds }
                }
            });
            console.log(`Deleted ${deletedUsers.count} non-admin users.`);
        } else {
            console.log('No non-admin users found.');
        }

        console.log('Cleanup complete.');

    } catch (error) {
        console.error('Error during cleanup:', error);
    } finally {
        await prisma.$disconnect();
    }
}

cleanup();
