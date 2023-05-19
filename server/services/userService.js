const UserModel = require("../models/user");
const bcrypt = require('bcryptjs')
const uuid = require('uuid');

const mailService = require('../services/mailService');
const tokenService = require('../services/tokenService');
const UserDTO = require('../dtos/userDTO');
const ApiError = require('../error/apiError');

class UserService {
    async registration(username, password) {
        const candidate = await UserModel.findOne({username})
        if (candidate) {
            throw ApiError.BadRequest(`* Емейл ${username} вже існує`);
        }

        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();

        const user = await UserModel.create({username, password: hashPassword, activationLink});
        await mailService.sendActivationMail(username, `${process.env.API_URL}/auth/activate/${activationLink}`);
        
        const userDTO = new UserDTO(user)
        const tokens = tokenService.generateToken({...userDTO});
        await tokenService.saveToken(userDTO.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDTO
        }
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({activationLink})
        if(!user) {
            throw new ApiError.BadRequest("Недійсна силка активації")
        }
        user.isActivated = true;
        await user.save();
    }

    async login(username, password) {
        const user = await UserModel.findOne({username})
        if (!user) {
            throw ApiError.BadRequest(`* Неправильний емейл або пароль`);
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if(!isPassEquals) {
            throw ApiError.BadRequest("* Неправильний емейл або пароль");
        }
        const userDTO = new UserDTO(user);
        const tokens = tokenService.generateToken({...userDTO});
        await tokenService.saveToken(userDTO.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDTO
        }
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await UserModel.findById(userData.id);
        const userDTO = new UserDTO(user);
        const tokens = tokenService.generateToken({...userDTO});
        await tokenService.saveToken(userDTO.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDTO
        }
    }
}

module.exports = new UserService();