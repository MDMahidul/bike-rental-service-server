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
exports.BikeServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const bike_model_1 = require("./bike.model");
const createBikeIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_model_1.Bike.create(payload);
    return result;
});
const getAllBikesFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_model_1.Bike.find();
    return result;
});
const updateSingleBikeIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isBikeExists = yield bike_model_1.Bike.isBikeExists(id);
    if (!isBikeExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'No Data Found');
    }
    const result = yield bike_model_1.Bike.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
const deleteSingleBikeIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isBikeExists = yield bike_model_1.Bike.isBikeExists(id);
    if (!isBikeExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'No Data Found!');
    }
    const result = yield bike_model_1.Bike.findByIdAndUpdate(id, { isAvailable: false }, { new: true });
    return result;
});
exports.BikeServices = {
    createBikeIntoDB,
    getAllBikesFromDB,
    updateSingleBikeIntoDB,
    deleteSingleBikeIntoDB,
};
