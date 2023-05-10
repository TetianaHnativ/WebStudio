const { validationResult } = require('express-validator');
const User = require('../models/user');
const Role = require('../models/role');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret } = require('../config');

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    };
    return jwt.sign(payload, secret, { expiresIn: "24h" } );
};

class AuthService {
    async register(username, password) {
        try {

            const loginVerification = await User.findOne({ username });
            if (loginVerification) {
                return { success: false, message: "Користувач з таким логіном вже інсує" };
            }
        
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({ value: "USER" });
            const user = new User({ username, password: hashPassword, roles: [userRole.value] });
            await user.save();
            return { success: true, message: "Користувач успішно заєструвався" };
        } catch (e) {
            console.log(e);
            return { success: false, message: "Помилка при реєстрації" };
        }
    }

    async login(username, password) {
        try {
            let user;
            user = await User.findOne({ username });
            if (!user) {
                return { success: false, message: `Користувач не найдений` };
            }
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return { success: false, message: `Неправильний пароль` };
            }
            const token = generateAccessToken(user._id, user.roles);
            return { success: true, token };
        } catch (e) {
            console.log(e);
            return { success: false, message: "Помилка при логіні" };
        }
    }
}

module.exports = new AuthService();
