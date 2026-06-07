import { Router } from 'express';
import { getAdminMenu } from '../controllers/adminController.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/menu', requireAdmin, getAdminMenu);

export default router;
