const ContactModel = require('../models/contact.js');

class contactController {
    async create(req, res) {
        try {
            const { name, phone, email, comment } = req.body;
            const contact = await ContactModel.create({ name, phone, email, comment });
            console.log(req.body);
            res.json(contact);

        } catch (e) {
            res.status(500).json(e);
        }
    }
}


module.exports = new contactController();