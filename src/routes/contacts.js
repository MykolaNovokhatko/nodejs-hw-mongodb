import express from 'express';
import {
  getContacts,
  getContactByIdController,
  createContactController,
  updateContactController,
  deleteContactController,
} from '../controllers/controllerContacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { contactSchema } from '../validators/contactValidator.js';
import isValidId from '../middlewares/isValidId.js';

const router = express.Router();

router.get('/', ctrlWrapper(getContacts));
router.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));
router.post('/', validateBody(contactSchema), ctrlWrapper(createContactController));
router.patch('/:contactId', isValidId, validateBody(contactSchema), ctrlWrapper(updateContactController));
router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));

export default router;
