import { Router } from 'express';
import adminRoutes from './adminRoutes.js';
import { requireApiKey } from '../middleware/auth.js';
import portfolioRoutes from './portfolioRoutes.js';

const router = Router();

router.use(requireApiKey);

router.get('/health', (_req, res) => {
  res.json({ success: true, message: 'API is healthy' });
});

router.use('/admin', adminRoutes);
router.use('/portfolio', portfolioRoutes);

export default router;
