const jwt = require('jsonwebtoken');
const tokenModel = require('../models/token')

class TokenService {
    generateToken(payload) {
        const acessToken = jwt.sign(payload, process.env.JWT_ACESS_SECRET, {expiresIn: '30m'});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'});

        return {
            acessToken,
            refreshToken
        }
    }

    validateAcessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACESS_SECRET);
            return userData;
        } catch (e) {
            return null;
        }

    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (e) {
            return null;
        }

    }

    async saveToken(userId, refreshToken) {
        const TokenData = await tokenModel.findOne({user: userId})
        if (TokenData) {
            TokenData.refreshToken = refreshToken;
            return TokenData.save();
        }
        
        const token = await tokenModel.create({user: userId, refreshToken})
        return token;
    }

    async removeToken(refreshToken) {
        const TokenData = await tokenModel.deleteOne({refreshToken})
        return TokenData;
    }

    async findToken(refreshToken) {
        const TokenData = await tokenModel.findOne({refreshToken})
        return TokenData;
    }
}

module.exports = new TokenService();