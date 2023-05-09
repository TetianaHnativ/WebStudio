const Router = require('express');
const router = new Router();
const contactRouter = require('./contactRouter.js')
const serviceRouter = require('./serviceRouter.js')
const orderRouter = require('./orderRouter.js')

router.use('/', contactRouter)
router.use('/', orderRouter)
router.use('/services', serviceRouter);
router.use('/portfolio', contactRouter);

module.exports = router