const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

const ServiceModel = mongoose.model('Service', ServiceSchema);

module.exports = ServiceModel;