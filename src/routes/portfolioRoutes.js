import { Router } from 'express';
import { getPortfolio } from '../controllers/portfolioController.js';
import aboutRoutes from './aboutRoutes.js';
import contactRoutes from './contactRoutes.js';
import experienceRoutes from './experienceRoutes.js';
import projectRoutes from './projectRoutes.js';
import skillRoutes from './skillRoutes.js';

const router = Router();

router.get('/', getPortfolio);
router.use('/about', aboutRoutes);
router.use('/skills', skillRoutes);
router.use('/projects', projectRoutes);
router.use('/experience', experienceRoutes);
router.use('/experiences', experienceRoutes);
router.use('/contact', contactRoutes);

export default router;
