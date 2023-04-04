const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  lastName: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    require: true
  }
});

const OrderModel = mongoose.model('Order', OrderSchema);

module.exports = OrderModel;