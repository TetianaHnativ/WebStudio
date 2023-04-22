const OrderService = require('../services/orderService');

class OrderController {
  async create(req, res) {
    try {
      const order = await OrderService.create(req.body);
      console.log(order);
      res.json(order);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  }
}

module.exports = new OrderController();
