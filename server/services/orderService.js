const Order = require('../models/order');
const Service = require('../models/service');

class OrderService {
  async create(orderData) {
    const { lastName, firstName, phone, email, serviceId } = orderData;
    const service = await Service.findById(serviceId);
    if (!service) {
      throw new Error('Service not found');
    }
    const order = await Order.create({
      lastName,
      firstName,
      phone,
      email,
      service: service._id
    });
    return order;
  }
}

module.exports = new OrderService();
