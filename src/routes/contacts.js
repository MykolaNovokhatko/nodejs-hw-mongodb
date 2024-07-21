import express from 'express';
import { getContacts, getContactByIdController, createContact, updateContact, deleteContact } from '../controllers/controllerContacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
const router = express.Router();

router.get('/', getContacts);
router.get('/:contactId', getContactByIdController);
router.post('/', ctrlWrapper(createContact));
router.patch('/:contactId', ctrlWrapper(updateContact));
router.delete('/:contactId', ctrlWrapper(deleteContact));

export default router;