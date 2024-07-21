import { getAllContacts, getContactById, createContact as createNewContact, updateContact, deleteContact } from '../services/contacts.js';
import createError from 'http-errors';

async function getContacts(req, res) {
  try {
    const contacts = await getAllContacts();
    if (!contacts || contacts.length === 0) {
     throw createError(404, 'Contacts not found');
    }
    res.status(200).json({
      status: 'success',
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      status: 'error',
      message: error.message,
    });
  }
}

async function getContactByIdController(req, res) {
  const { contactId } = req.params;
  try {
    const contact = await getContactById(contactId);
    if (!contact) {
      throw createError(404, 'Contact not found');
    }
    res.status(200).json({
      status: 'success',
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      status: 'error',
      message: error.message,
    });
  }
}

async function createContactController(req, res) {
  try {
    const newContact = await createNewContact(req.body);
    res.status(201).json({
      status: 'success',
      message: 'Successfully created a contact!',
      data: newContact,
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
}

async function updateContactController(req, res) {
  const { contactId } = req.params;
  try {
    const updatedContact = await updateContact(contactId, req.body);
    if (!updatedContact) {
      throw createError(404, 'Contact not found');
    }
    res.status(200).json({
      status: 'success',
      message: 'Successfully patched a contact!',
      data: updatedContact,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      status: 'error',
      message: error.message,
    });
  }
}

async function deleteContactController(req, res) {
  const { contactId } = req.params;
  try {
    const deletedContact = await deleteContact(contactId);
    if (!deletedContact) {
      throw createError(404, 'Contact not found');
    }
    res.status(204).end();
  } catch (error) {
    res.status(error.status || 500).json({
      status: 'error',
      message: error.message,
    });
  }
}

export { getContacts, getContactByIdController, createContactController, updateContactController, deleteContactController };
