const { formatErrorResponse } = require('../helpers/formatResponse');
const { ValidationError } = require('express-validation');

// Global error handling middleware
const apiErrorHandler = (err, req, res, next) => {
    console.error(err);

    // Return structured details for request validation failures.
    if (err instanceof ValidationError) {
        return res.status(err.statusCode).json({
            status: err.statusCode,
            message: err.message,
            details: err.details
        });
    }

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json(formatErrorResponse(message, statusCode));
};


module.exports = apiErrorHandler;