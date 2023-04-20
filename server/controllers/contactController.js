const ContactService = require('../services/contactService.js')

class contactController {
    async create(req, res) {
        try {
            const contact = await ContactService.create(req.body)
            console.log(contact)
            res.json(contact)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

module.exports = new contactController();