const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController')
const {body} = require('express-validator')

router.post('/registration',
    body('username').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    userController.registation);

router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);
router.get('/activate/:link', userController.activate);
router.get('/users', userController.getUsers)


module.exports = router