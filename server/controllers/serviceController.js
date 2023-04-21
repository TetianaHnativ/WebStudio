const ServiceService = require('../services/serviceService')

class serviceController {
    async getCategories(req, res) {
        try {
            const categories = await ServiceService.getDistinctCategories()
            res.render('index', { categories })
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getServices(req, res) {
        try {
            const category = req.query.category
            const services = await ServiceService.getServiceByCategory(category)
            res.send({ services })
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

module.exports = new serviceController()
