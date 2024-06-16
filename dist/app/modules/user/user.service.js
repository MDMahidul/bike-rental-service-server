"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const user_model_1 = require("./user.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const getProfileFromDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if the user is exist
    const user = yield user_model_1.User.isUserExistsByEmail(userData.userEmail);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This user is not found !');
    }
    const result = yield user_model_1.User.findOne({ email: userData.userEmail });
    return result;
});
const updateProfileIntoDB = (userData, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phone, address } = payload;
    // checking if the user is exist
    const user = yield user_model_1.User.isUserExistsByEmail(userData.userEmail);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This user is not found !');
    }
    const result = yield user_model_1.User.findOneAndUpdate({ email: userData.userEmail }, payload, { new: true }).select('-createdAt -updatedAt -__v');
    return result;
});
exports.userServices = {
    getProfileFromDB,
    updateProfileIntoDB,
};
