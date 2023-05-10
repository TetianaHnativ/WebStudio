const Router = require('express');
const router = new Router();
const AuthController = require('../controllers/authController.js')
const {check} = require("express-validator")

router.post('/registration', [
    check('username', "Логін не може бути пустим").notEmpty(),
    check('password', "Пароль має бути більше 4 і меньше 30").isLength({min:4, max:30})
], AuthController.register)
router.post('/login', AuthController.login);

module.exports = router;