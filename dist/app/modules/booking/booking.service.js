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
exports.BookingServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const bike_model_1 = require("../bike/bike.model");
const user_model_1 = require("../user/user.model");
const booking_model_1 = require("./booking.model");
const createRentalIntoDB = (payload, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { bikeId, startTime } = payload;
    // Check if bike exists and isavailable
    const bike = yield bike_model_1.Bike.findById(bikeId);
    if (!bike) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Bike not found!');
    }
    if (!bike.isAvailable) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Bike is not available!');
    }
    // Check if user exists
    const { userEmail } = userData;
    const user = yield user_model_1.User.findOne({ email: userEmail });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found!');
    }
    // check if user has an active rental
    const userActiveRental = yield booking_model_1.Booking.findOne({
        userId: user._id,
        isReturned: false,
    });
    if (userActiveRental) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'User already has an active rental!');
    }
    // Create the booking
    const booking = new booking_model_1.Booking(Object.assign(Object.assign({}, payload), { userId: user._id }));
    // Update bike availability to false
    yield bike_model_1.Bike.findByIdAndUpdate(bikeId, { isAvailable: false }, { new: true });
    const result = yield booking.save();
    return result;
});
const returnRental = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // check the rental id
    const rental = yield booking_model_1.Booking.findById(id);
    if (!rental) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Rental not found!');
    }
    // check if the rental has been returned
    if (rental.isReturned) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Bike has already been returned!');
    }
    //check the bike
    const bike = yield bike_model_1.Bike.findById(rental.bikeId);
    if (!bike) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Bike not found!');
    }
    // now calculate the total cost
    const returnTime = new Date();
    const durationHours = Number(((returnTime.getTime() - rental.startTime.getTime()) /
        (1000 * 3600)).toFixed(2));
    const totalCost = (durationHours * bike.pricePerHour).toFixed(2);
    // now update the rental info
    rental.returnTime = returnTime;
    rental.totalCost = Number(totalCost);
    rental.isReturned = true;
    yield rental.save();
    // also Update the bike's availability
    bike.isAvailable = true;
    yield bike.save();
    return rental;
});
const getAllRentalsFromDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email: userData.userEmail });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found!');
    }
    const result = yield booking_model_1.Booking.find({ userId: user._id });
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'No data found for this user');
    }
    return result;
});
exports.BookingServices = {
    createRentalIntoDB,
    returnRental,
    getAllRentalsFromDB,
};
