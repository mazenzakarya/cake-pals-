const jwt = require('jsonwebtoken');
const ApiError = require('.././error/api-error-handler')


function verifyToken(req, res, next) {
    try {
        const bearerHeader = req.headers["authorization"];
        if (!bearerHeader) throw new Error("unAuthourized");
        const [_, bearerToken] = bearerHeader.split(" ");
        jwt.verify(bearerToken, config.jwt.secret, function (err, decoded) {
            if (err) throw ApiError.unAuthorized("unauthorized");
            req.user = decoded;
        });
        next();
    }
    catch (error) {
        next(error)
    }
};

module.exports = verifyToken;