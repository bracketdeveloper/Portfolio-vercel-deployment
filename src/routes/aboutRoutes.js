import { Router } from 'express';
import { deleteAbout, getAbout, uploadProfilePic, upsertAbout } from '../controllers/aboutController.js';
import { requireAdmin } from '../middleware/auth.js';
import { profileUpload } from '../middleware/upload.js';
import { validate } from '../middleware/validate.js';
import { aboutSchema } from '../validators/portfolioValidators.js';

const router = Router();

router.get('/', getAbout);
router.post('/', requireAdmin, validate(aboutSchema), upsertAbout);
router.put('/', requireAdmin, validate(aboutSchema), upsertAbout);
router.delete('/', requireAdmin, deleteAbout);
router.post('/profile-picture', requireAdmin, profileUpload.single('profile_pic'), uploadProfilePic);

export default router;
