const formatSuccessResponse = (message, data = null) => {
    return {
        status: 200,
        message,
        data
    };
};

const formatErrorResponse = (message, statusCode = 500) => {
    return {
        status: statusCode,
        message
    };
};

module.exports = {
    formatSuccessResponse,
    formatErrorResponse
};