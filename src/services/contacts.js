import Contact from '../models/contact.js';

async function getAllContacts({ page, perPage, sortBy, sortOrder }) {
  try {
    const skip = (page - 1) * perPage;
    const totalItems = await Contact.countDocuments();
    const totalPages = Math.ceil(totalItems / perPage);
    const contacts = await Contact.find({})
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(Number(perPage));

    return {
      data: contacts,
      page: Number(page),
      perPage: Number(perPage),
      totalItems,
      totalPages,
      hasPreviousPage: page > 1,
      hasNextPage: page < totalPages,
    };
  } catch (error) {
    console.error('Error while fetching contacts:', error);
    throw error;
  }
}

async function getContactById(contactId) {
  try {
    const contact = await Contact.findById(contactId);
    return contact;
  } catch (error) {
    console.error(`Error while fetching contact with id ${contactId}:`, error);
    throw error;
  }
}

async function createContact(contactData) {
  try {
    const newContact = new Contact(contactData);
    await newContact.save();
    return newContact;
  } catch (error) {
    console.error('Error while creating a new contact:', error);
    throw error;
  }
}

async function updateContact(contactId, contactData) {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      contactData,
      { new: true },
    );
    return updatedContact;
  } catch (error) {
    console.error(`Error while updating contact with id ${contactId}:`, error);
    throw error;
  }
}

async function deleteContact(contactId) {
  try {
    const deletedContact = await Contact.findByIdAndDelete(contactId);
    return deletedContact;
  } catch (error) {
    console.error(`Error while deleting contact with id ${contactId}:`, error);
    throw error;
  }
}

export {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
