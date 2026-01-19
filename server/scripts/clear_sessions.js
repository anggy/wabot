import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();
const SESSIONS_DIR = path.join(process.cwd(), 'server/sessions');

async function clearSessions() {
    try {
        console.log('Clearing sessions...');

        // 1. Delete sessions from DB
        const deleted = await prisma.session.deleteMany({});
        console.log(`Deleted ${deleted.count} sessions from database.`);

        // 2. Delete session files
        if (fs.existsSync(SESSIONS_DIR)) {
            const files = fs.readdirSync(SESSIONS_DIR);
            for (const file of files) {
                if (file !== '.gitignore' && file !== 'README.md') {
                    const filePath = path.join(SESSIONS_DIR, file);
                    fs.rmSync(filePath, { recursive: true, force: true });
                    console.log(`Deleted file/folder: ${file}`);
                }
            }
        }

        console.log('Session cleanup complete.');

    } catch (error) {
        console.error('Error clearing sessions:', error);
    } finally {
        await prisma.$disconnect();
    }
}

clearSessions();
