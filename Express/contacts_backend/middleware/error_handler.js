const { constants } = require("../constants.js")

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    console.log(statusCode);
    const title = (() => {
        switch (statusCode) {
            case constants.VALIDATION_ERROR:
                return "Validation Error";
            case constants.NOT_FOUND_ERROR:
                return "Not Found";
            case constants.UNAUTHORIZED_ERROR:
                return "Unauthorized";
            case constants.FORBIDDEN_ERROR:
                return "Forbidden !";
            case constants.INTERNAL_SERVER_ERROR:
                return "Internal Server Error";
            default:
                return "Something went wrong";
        }
    });
    res.json({ title: title, message: err.message, stackTrace: err.stack });
};

module.exports = errorHandler;