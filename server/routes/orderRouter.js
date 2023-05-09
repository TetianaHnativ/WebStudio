const Router = require('express');
const router = new Router();
const OrderController = require('../controllers/orderController');

router.post('/orders', OrderController.create);

module.exports = router;
