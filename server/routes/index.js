const Router = require('express');
const router = new Router();
const contactRouter = require('./contactRouter.js')

router.use('/', contactRouter)
router.use('/portfolio', contactRouter)

module.exports = router