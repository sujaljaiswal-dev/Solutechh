/**
 * Standard API Response class
 * Ensures consistent response format across all endpoints
 */
class ApiResponse {
    /**
     * Create API response object
     * @param {boolean} success - Operation success status
     * @param {string} message - Response message
     * @param {*} data - Response data (object or array)
     * @param {Object} pagination - Pagination info (optional)
     */
    constructor(success, message, data = null, pagination = null) {
        this.success = success;
        this.message = message;
        this.data = data;

        if (pagination) {
            this.pagination = pagination;
        }
    }
}

/**
 * Send success response
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Success message
 * @param {*} data - Response data
 * @param {Object} pagination - Pagination info (optional)
 */
const sendSuccess = (res, statusCode, message, data = null, pagination = null) => {
    res.status(statusCode).json(new ApiResponse(true, message, data, pagination));
};

/**
 * Send error response
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Error message
 */
const sendError = (res, statusCode, message) => {
    res.status(statusCode).json(new ApiResponse(false, message));
};

module.exports = {
    ApiResponse,
    sendSuccess,
    sendError,
};
