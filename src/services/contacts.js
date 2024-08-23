import Contact from '../models/contact.js';

const getAllContacts = async (userId, { page, limit }) => {
  const skip = (page - 1) * limit;
  return await Contact.find({ owner: userId }).skip(skip).limit(limit);
};

const getContactById = async (id, userId) => {
  return await Contact.findOne({ _id: id, owner: userId });
};

const createContact = async (contactData, userId) => {
  const newContact = new Contact({ ...contactData, owner: userId });
  return await newContact.save();
};

const updateContact = async (id, contactData, userId) => {
  return await Contact.findOneAndUpdate({ _id: id, owner: userId }, contactData, { new: true });
};

const deleteContact = async (id, userId) => {
  return await Contact.findOneAndDelete({ _id: id, owner: userId });
};

export {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};





// import Contact from '../models/contact.js';

// const getAllContacts = async (userId) => {
//   try {
//     const contacts = await Contact.find({ userId });
//     return contacts;
//   } catch (error) {
//     console.error('Error while fetching contacts:', error);
//     throw error;
//   }
// };

// const getContactById = async (contactId, userId) => {
//   try {
//     const contact = await Contact.findOne({ _id: contactId, userId });
//     return contact;
//   } catch (error) {
//     console.error(`Error while fetching contact with id ${contactId}:`, error);
//     throw error;
//   }
// };

// const createContact = async (contactData, userId) => {
//   try {
//     const newContact = new Contact({ ...contactData, userId });
//     await newContact.save();
//     return newContact;
//   } catch (error) {
//     console.error('Error while creating a new contact:', error);
//     throw error;
//   }
// };

// const updateContact = async (contactId, contactData, userId) => {
//   try {
//     const updatedContact = await Contact.findOneAndUpdate(
//       { _id: contactId, userId },
//       contactData,
//       { new: true },
//     );
//     return updatedContact;
//   } catch (error) {
//     console.error(`Error while updating contact with id ${contactId}:`, error);
//     throw error;
//   }
// };

// const deleteContact = async (contactId, userId) => {
//   try {
//     const deletedContact = await Contact.findOneAndDelete({
//       _id: contactId,
//       userId,
//     });
//     return deletedContact;
//   } catch (error) {
//     console.error(`Error while deleting contact with id ${contactId}:`, error);
//     throw error;
//   }
// };

// export {
//   getAllContacts,
//   getContactById,
//   createContact,
//   updateContact,
//   deleteContact,
// };
