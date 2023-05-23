const Contact = require('../models/contact')

class contactService {
    async create(contact) {
        const createdContact = await Contact.create({...contact});
        return createdContact;
    }
}


module.exports = new contactService();