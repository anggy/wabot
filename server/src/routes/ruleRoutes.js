import express from 'express';
import * as rulesController from '../controllers/rulesController.js';

const router = express.Router();

/**
 * @swagger
 * /api/rules:
 *   get:
 *     summary: Get all rules
 *     tags: [Rules]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of rules
 *   post:
 *     summary: Create a rule
 *     tags: [Rules]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - keywords
 *               - type
 *               - response
 *             properties:
 *               keywords:
 *                 type: array
 *                 items:
 *                   type: string
 *               type:
 *                 type: string
 *                 enum: [TEXT, IMAGE]
 *               response:
 *                 type: string
 *               logic:
 *                 type: string
 *                 enum: [EQUALS, CONTAINS, STARTS_WITH]
 *     responses:
 *       201:
 *         description: Rule created
 */
router.get('/', rulesController.getRules);
router.post('/', rulesController.createRule);

/**
 * @swagger
 * /api/rules/{id}:
 *   put:
 *     summary: Update a rule
 *     tags: [Rules]
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
 *               keywords:
 *                 type: array
 *                 items:
 *                   type: string
 *               response:
 *                 type: string
 *     responses:
 *       200:
 *         description: Rule updated
 *   delete:
 *     summary: Delete a rule
 *     tags: [Rules]
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
 *         description: Rule deleted
 */
router.put('/:id', rulesController.updateRule);
router.delete('/:id', rulesController.deleteRule);

export default router;
