import jwt from 'jsonwebtoken';
import { prisma } from '../prisma.js';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkeychangedinprod';

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, async (err, user) => {
        if (err) {
            console.log('JWT Verify Error:', err.message);
            return res.sendStatus(403);
        }

        try {
            console.log('Verifying user in DB:', user.id);
            const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
            if (!dbUser) {
                console.log('User not found in DB');
                return res.sendStatus(401);
            }

            req.user = user;
            console.log('Auth success:', user.username);
            next();
        } catch (e) {
            console.error('Auth verification error:', e);
            res.sendStatus(500);
        }
    });
};

export const requireAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'ADMIN') {
        next();
    } else {
        res.status(403).json({ error: 'Admin access required' });
    }
};
