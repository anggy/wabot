import express from 'express';
import * as aiController from '../controllers/aiController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticateToken);

router.get('/tools', aiController.getTools);
router.post('/tools', aiController.createTool);
router.put('/tools/:id', aiController.updateTool);
router.delete('/tools/:id', aiController.deleteTool);
router.post('/chat', aiController.testChat);

export default router;
