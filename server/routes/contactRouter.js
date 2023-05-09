const Router = require('express');
const router = new Router();
const PostController = require('../controllers/contactController.js')

router.post('/form-contact', PostController.create);

module.exports = router;


