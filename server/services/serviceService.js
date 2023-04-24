const ServiceModel = require('../models/service');

class serviceService {
    async create(service) {
        const createdService = await ServiceModel.create({...service});
        return createdService;
    }

    async getServiceByCategory(category) {
        const services = await ServiceModel.find({ category })
        return services
    }

    async getDistinctCategories() {
        const categories = await ServiceModel.distinct('category')
        return categories
    }
}

module.exports = new serviceService()