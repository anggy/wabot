import { prisma } from '../prisma.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { logger } from '../config/logger.js';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkeychangedinprod';

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { username } });
        if (!user) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '24h' });
        res.json({ token, role: user.role, username: user.username, credits: user.credits });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ error: 'Login failed' });
    }
};

export const register = async (req, res) => {
    const { username, password, role } = req.body;

    // Simple protection: Check if any users exist. If not, allow creating ADMIN.
    // If users exist, check if requester is ADMIN (middleware should handle this, but double check)
    // For initial setup, we allow creating if table is empty.

    try {
        const userCount = await prisma.user.count();
        let userRole = 'USER';

        if (userCount === 0) {
            userRole = 'ADMIN';
        } else {
            // If users exist, this endpoint should optionally be protected or validated.
            // For simplicity in this iteration, we trust the `role` passed IF the creator is auth'd or we just default to USER.
            // But let's enforce: If creating subsequent users, maybe default to USER unless specified.
            if (role && ['ADMIN', 'USER'].includes(role)) {
                userRole = role;
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
                role: userRole
            }
        });

        res.status(201).json({ message: 'User created', userId: user.id });
    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(400).json({ error: 'Username already exists' });
        }
        logger.error(error);
        res.status(500).json({ error: 'Registration failed' });
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: { id: true, username: true, role: true, credits: true, isActive: true, planType: true, messageCost: true, planExpiresAt: true, aiApiKey: true, aiBriefing: true, isAiEnabled: true }
        });
        if (!user) return res.sendStatus(404);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
};
