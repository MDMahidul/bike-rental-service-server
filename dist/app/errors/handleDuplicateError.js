"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateError = (err) => {
    const match = err.message.match(/"([^"]*)"/);
    const extractedMessage = match && match[1];
    const errorMessages = [
        {
            path: '',
            message: `${extractedMessage} is already exist`,
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: 'Duplicate Data found!',
        errorMessages,
    };
};
exports.default = handleDuplicateError;
