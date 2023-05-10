const { validationResult } = require('express-validator');
const authService = require('../services/authService');

class AuthController {
    async register(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Помилка при реєстрації", errors})
            }
            const { username, password } = req.body;
            const result = await authService.register(username, password);
            if (!result.success) {
                return res.status(400).json({ message: result.message });
            }
            return res.json({ message: result.message });
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Registation error' });
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body;
            const result = await authService.login(username, password);
            if (!result.success) {
                return res.status(400).json({ message: result.message });
            }
            return res.json({ token: result.token });
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Login error' });
        }
    }
}

module.exports = new AuthController();