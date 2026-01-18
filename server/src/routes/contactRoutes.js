import express from 'express';
import { prisma } from '../prisma.js';
import { logger } from '../config/logger.js';

const router = express.Router();

/**
 * @swagger
 * /api/contacts:
 *   get:
 *     summary: Get all contacts
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of contacts
 *   post:
 *     summary: Create a contact
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - phone
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               tags:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contact created
 */
router.get('/', async (req, res) => {
    try {
        const contacts = await prisma.contact.findMany({
            where: { userId: req.user.id },
            orderBy: { name: 'asc' }
        });
        res.json(contacts);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, phone, tags } = req.body;
        const contact = await prisma.contact.create({
            data: { name, phone, tags, userId: req.user.id }
        });
        res.status(201).json(contact);
    } catch (e) {
        if (e.code === 'P2002') {
            return res.status(400).json({ error: 'Phone number already exists' });
        }
        logger.error(e);
        res.status(500).json({ error: 'Failed to create contact' });
    }
});

/**
 * @swagger
 * /api/contacts/{id}:
 *   put:
 *     summary: Update a contact
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               tags:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contact updated
 *   delete:
 *     summary: Delete a contact
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact deleted
 */
router.put('/:id', async (req, res) => {
    try {
        const { name, phone, tags } = req.body;
        const contact = await prisma.contact.update({
            where: { id: parseInt(req.params.id), userId: req.user.id },
            data: { name, phone, tags }
        });
        res.json(contact);
    } catch (e) {
        if (e.code === 'P2002') return res.status(400).json({ error: 'Phone number already exists' });
        res.status(500).json({ error: 'Failed to update contact' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const count = await prisma.contact.deleteMany({
            where: { id: parseInt(req.params.id), userId: req.user.id }
        });
        if (count.count === 0) return res.status(404).json({ error: 'Contact not found' });
        res.json({ message: 'Contact deleted' });
    } catch (e) {
        logger.error(e);
        res.status(500).json({ error: 'Failed to delete contact' });
    }
});

export default router;
