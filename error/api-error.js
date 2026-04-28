class ApiError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'ApiError';
    }

    static badRequest(message) {
        return new ApiError(400, message);
    }

    static unAuthorized(message) {
        return new ApiError(401, message);
    }

    static notFound(message) {
        return new ApiError(404, message);
    }
}

module.exports = ApiError;