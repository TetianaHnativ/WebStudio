const ApiError = require('../error/apiError')

module.exports = function (req, res, next) {
    try {

    } catch (e) {
        return next(ApiError.UnauthorizedError());
    }
}