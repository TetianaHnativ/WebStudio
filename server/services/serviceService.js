const ServiceModel = require('../models/service');

class serviceService {
    async getServiceByCategory(category) {
        const services = await ServiceModel.find({ category })
        return services
    }

    async getDistinctCategories() {
        const categories = await ServiceModel.distinct('category')
        return categories
    }

    async create(service) {
        const createdService = new ServiceModel({...service})
        await createdService.save()
        return createdService
    }
}

module.exports = new serviceService()