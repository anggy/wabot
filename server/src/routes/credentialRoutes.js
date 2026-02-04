import express from 'express';
import * as credentialController from '../controllers/credentialController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authenticateToken);

router.get('/', credentialController.getCredentials);
router.post('/', credentialController.createCredential);
router.put('/:id', credentialController.updateCredential);
router.delete('/:id', credentialController.deleteCredential);

export default router;
