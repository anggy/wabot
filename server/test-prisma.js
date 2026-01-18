import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import dotenv from 'dotenv';
dotenv.config();

console.log('PrismaClient:', PrismaClient);

try {
    const prisma = new PrismaClient();
    console.log('Instance created successfully');
} catch (e) {
    console.error('Error creating instance:', e);
}

try {
    const prisma = new PrismaClient({
        datasources: {
            db: {
                url: process.env.DATABASE_URL
            }
        }
    });
    console.log('Instance with datasources created');
} catch (e) {
    console.error('Error with datasources:', e);
}
