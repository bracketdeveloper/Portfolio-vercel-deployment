import { Router } from 'express';
import {
  deleteContactMessage,
  deleteContactInfo,
  getContactMessage,
  getContactInfo,
  getContactMessages,
  submitContactMessage,
  updateContactMessageStatus,
  upsertContactInfo,
} from '../controllers/contactController.js';
import { requireAdmin } from '../middleware/auth.js';
import { contactLimiter } from '../middleware/rateLimit.js';
import { validate } from '../middleware/validate.js';
import {
  contactInfoSchema,
  contactMessageSchema,
  contactStatusSchema,
  objectIdSchema,
} from '../validators/portfolioValidators.js';

const router = Router();

router.get('/', getContactInfo);
router.post('/', requireAdmin, validate(contactInfoSchema), upsertContactInfo);
router.put('/', requireAdmin, validate(contactInfoSchema), upsertContactInfo);
router.delete('/', requireAdmin, deleteContactInfo);
router.post('/messages', contactLimiter, validate(contactMessageSchema), submitContactMessage);
router.get('/messages', requireAdmin, getContactMessages);
router.patch('/messages/:id/status', requireAdmin, validate(objectIdSchema, 'params'), validate(contactStatusSchema), updateContactMessageStatus);
router.get('/messages/:id', requireAdmin, validate(objectIdSchema, 'params'), getContactMessage);
router.delete('/messages/:id', requireAdmin, validate(objectIdSchema, 'params'), deleteContactMessage);

export default router;
