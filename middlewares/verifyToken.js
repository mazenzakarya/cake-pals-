const jwt = require('jsonwebtoken');
const ApiError = require('../error/api-error')


function verifyToken(req, res, next) {
    try {
        const bearerHeader = req.headers["authorization"];
        if (!bearerHeader) throw ApiError.unAuthorized("unauthorized");
        const [_, bearerToken] = bearerHeader.split(" ");
        const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET);
        req.user = decoded;
        return next();
    }
    catch (error) {
        return next(error)
    }
};

module.exports = verifyToken;