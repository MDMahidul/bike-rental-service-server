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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bike = void 0;
const mongoose_1 = require("mongoose");
const bikeSchema = new mongoose_1.Schema({
    name: { type: String, required: [true, 'Bike name is required!'] },
    description: {
        type: String,
        required: [true, 'Bike details is required!'],
    },
    pricePerHour: {
        type: Number,
        required: [true, 'Price per hour is required!'],
    },
    isAvailable: { type: Boolean, default: true },
    cc: { type: Number, required: [true, 'Bike cc is required!'] },
    year: { type: Number, required: [true, 'Bike year is required!'] },
    model: { type: String, required: [true, 'Bike model is required!'] },
    brand: { type: String, required: [true, 'Bike brand is required!'] },
}, {
    timestamps: false,
    toJSON: {
        // Remove the password from the output
        transform: (doc, ret) => {
            delete ret.__v;
            return ret;
        },
    },
});
// Query middleware
// only get the available bikes
bikeSchema.pre('find', function (next) {
    this.find({ isAvailable: { $ne: false } });
    next();
});
// create static function
bikeSchema.statics.isBikeExists = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield exports.Bike.findById(id);
    });
};
exports.Bike = (0, mongoose_1.model)('Bike', bikeSchema);
