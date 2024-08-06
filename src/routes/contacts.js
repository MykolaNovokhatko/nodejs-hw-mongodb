import express from 'express';
import {
  getContacts,
  getContactByIdController,
  createContactController,
  updateContactController,
  deleteContactController,
} from '../controllers/controllerContacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import authenticate from '../middlewares/authenticate.js';

const router = express.Router();

// router.use(authenticate);

router.get('/', authenticate, ctrlWrapper(getContacts));
router.get('/:contactId', authenticate, ctrlWrapper(getContactByIdController));
router.post('/', authenticate, ctrlWrapper(createContactController));
router.patch('/:contactId', authenticate, ctrlWrapper(updateContactController));
router.delete('/:contactId', authenticate, ctrlWrapper(deleteContactController));

export default router;
