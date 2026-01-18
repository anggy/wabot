import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import dotenv from 'dotenv';
dotenv.config();

export const prisma = new PrismaClient();
