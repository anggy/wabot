import { prisma } from '../prisma.js';
import { logger } from '../config/logger.js';

export const getRules = async (req, res) => {
    const rules = await prisma.rule.findMany({ where: { userId: req.user.id } });
    res.json(rules);
};

export const createRule = async (req, res) => {
    try {
        const {
            name, triggerType, triggerValue, actionType,
            apiUrl, apiMethod, apiPayload, responseContent,
            responseMediaType, responseMediaUrl, sessionId
        } = req.body;

        const rule = await prisma.rule.create({
            data: {
                name,
                triggerType,
                triggerValue,
                actionType,
                apiUrl: apiUrl || null,
                apiMethod: apiMethod || 'POST',
                apiPayload: apiPayload || '{}',
                responseContent: responseContent || null,
                responseMediaType: responseMediaType || 'TEXT',
                responseMediaUrl: responseMediaUrl || null,
                sessionId: sessionId || null,
                userId: req.user.id
            }
        });
        res.status(201).json(rule);
    } catch (error) {
        logger.error(error);
        res.status(500).json({ error: 'Failed to create rule' });
    }
};

export const updateRule = async (req, res) => {
    const { id } = req.params;
    try {
        const {
            name, triggerType, triggerValue, actionType,
            apiUrl, apiMethod, apiPayload, responseContent,
            responseMediaType, responseMediaUrl, sessionId
        } = req.body;

        const rule = await prisma.rule.findUnique({ where: { id: parseInt(id) } });
        if (!rule || rule.userId !== req.user.id) return res.status(404).json({ error: 'Rule not found' });

        const updatedRule = await prisma.rule.update({
            where: { id: parseInt(id) },
            data: {
                name,
                triggerType,
                triggerValue,
                actionType,
                apiUrl: apiUrl || null,
                apiMethod: apiMethod || 'POST',
                apiPayload: apiPayload || '{}',
                responseContent: responseContent || null,
                responseMediaType: responseMediaType || 'TEXT',
                responseMediaUrl: responseMediaUrl || null,
                sessionId: sessionId || null
            }
        });
        res.json(updatedRule);
    } catch (error) {
        logger.error(error);
        res.status(500).json({ error: 'Failed to update rule' });
    }
};

export const deleteRule = async (req, res) => {
    const { id } = req.params;
    try {
        const count = await prisma.rule.deleteMany({
            where: { id: parseInt(id), userId: req.user.id }
        });
        if (count.count === 0) return res.status(404).json({ error: 'Rule not found' });
        res.json({ message: 'Rule deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete rule' });
    }
};
