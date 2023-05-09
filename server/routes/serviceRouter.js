const express = require('express');
const ServiceController = require('../controllers/serviceController.js');

const router = express.Router();

router.get('/', ServiceController.getServices);
router.post('/service', ServiceController.create)

module.exports = router;


