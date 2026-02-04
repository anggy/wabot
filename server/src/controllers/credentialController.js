import { prisma } from '../prisma.js';
import { logger } from '../config/logger.js';

export const getCredentials = async (req, res) => {
    try {
        const credentials = await prisma.aiCredential.findMany({
            where: { userId: req.user.id }
        });
        res.json(credentials);
    } catch (error) {
        logger.error(error);
        res.status(500).json({ error: 'Failed to fetch credentials' });
    }
};

export const createCredential = async (req, res) => {
    try {
        const { name, type, key, value, location, refreshUrl, refreshPayload, tokenPath } = req.body;

        const credential = await prisma.aiCredential.create({
            data: {
                userId: req.user.id,
                name,
                type,
                key,
                value,
                location: location || 'HEADER',
                refreshUrl,
                refreshPayload: refreshPayload ? JSON.stringify(refreshPayload) : null,
                tokenPath
            }
        });
        res.status(201).json(credential);
    } catch (error) {
        logger.error(error);
        res.status(500).json({ error: 'Failed to create credential' });
    }
};

export const updateCredential = async (req, res) => {
    const { id } = req.params;
    try {
        const credential = await prisma.aiCredential.findUnique({ where: { id: parseInt(id) } });
        if (!credential || credential.userId !== req.user.id) {
            return res.status(404).json({ error: 'Credential not found' });
        }

        const data = { ...req.body };
        if (data.refreshPayload) data.refreshPayload = JSON.stringify(data.refreshPayload);

        const updated = await prisma.aiCredential.update({
            where: { id: parseInt(id) },
            data
        });
        res.json(updated);
    } catch (error) {
        logger.error(error);
        res.status(500).json({ error: 'Failed to update credential' });
    }
};

export const deleteCredential = async (req, res) => {
    const { id } = req.params;
    try {
        const credential = await prisma.aiCredential.findUnique({ where: { id: parseInt(id) } });
        if (!credential || credential.userId !== req.user.id) {
            return res.status(404).json({ error: 'Credential not found' });
        }

        await prisma.aiCredential.delete({ where: { id: parseInt(id) } });
        res.json({ message: 'Credential deleted' });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ error: 'Failed to delete credential' });
    }
};
