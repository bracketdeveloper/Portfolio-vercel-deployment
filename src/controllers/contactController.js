import { ContactInfo } from '../models/ContactInfo.js';
import { ContactMessage } from '../models/ContactMessage.js';
import { sendContactEmails } from '../services/emailService.js';
import { ApiError } from '../utils/apiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { sendResponse } from '../utils/sendResponse.js';

export const getContactInfo = asyncHandler(async (_req, res) => {
  const contactInfo = await ContactInfo.findOne().sort({ updatedAt: -1 });
  sendResponse(res, 200, 'Contact info fetched', contactInfo);
});

export const upsertContactInfo = asyncHandler(async (req, res) => {
  const contactInfo = await ContactInfo.findOneAndUpdate({}, req.body, {
    new: true,
    upsert: true,
    runValidators: true,
  });
  sendResponse(res, 200, 'Contact info saved', contactInfo);
});

export const deleteContactInfo = asyncHandler(async (_req, res) => {
  const contactInfo = await ContactInfo.findOneAndDelete({});
  if (!contactInfo) throw new ApiError(404, 'Contact info not found');
  sendResponse(res, 200, 'Contact info deleted', contactInfo);
});

export const submitContactMessage = asyncHandler(async (req, res) => {
  const contactMessage = await ContactMessage.create(req.body);
  await sendContactEmails(contactMessage);
  sendResponse(res, 201, 'Message sent successfully', contactMessage);
});

export const getContactMessages = asyncHandler(async (req, res) => {
  const filter = req.query.status ? { status: req.query.status } : {};
  const messages = await ContactMessage.find(filter).sort({ createdAt: -1 });
  sendResponse(res, 200, 'Contact messages fetched', messages);
});

export const getContactMessage = asyncHandler(async (req, res) => {
  const message = await ContactMessage.findById(req.params.id);
  if (!message) throw new ApiError(404, 'Contact message not found');
  sendResponse(res, 200, 'Contact message fetched', message);
});

export const updateContactMessageStatus = asyncHandler(async (req, res) => {
  const message = await ContactMessage.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!message) throw new ApiError(404, 'Contact message not found');
  sendResponse(res, 200, 'Contact message status updated', message);
});

export const deleteContactMessage = asyncHandler(async (req, res) => {
  const message = await ContactMessage.findByIdAndDelete(req.params.id);
  if (!message) throw new ApiError(404, 'Contact message not found');
  sendResponse(res, 200, 'Contact message deleted', message);
});
