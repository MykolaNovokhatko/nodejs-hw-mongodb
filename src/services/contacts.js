import Contact from "../models/contact.js";

async function getAllContacts() {
    try {
        const contacts = await Contact.find({});
        return contacts;
    } catch (error) {
        console.log(error);
    }
}

export {getAllContacts};