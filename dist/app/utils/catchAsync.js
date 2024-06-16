"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// created a common catch function to handle try catch
const catchAsync = (func) => {
    return (req, res, next) => {
        Promise.resolve(func(req, res, next)).catch((err) => next(err));
    };
};
exports.default = catchAsync;
