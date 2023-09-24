"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
function errorHandler(statusCode, message) {
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    return error;
}
exports.errorHandler = errorHandler;
