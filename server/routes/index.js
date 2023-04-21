const Router = require('express');
const router = new Router();
const contactRouter = require('./contactRouter.js')
const serviceRouter = require('./serviceRouter.js')


router.use('/services', serviceRouter);
router.use('/contacts', contactRouter);
router.use('/portfolio', contactRouter);

module.exports = router