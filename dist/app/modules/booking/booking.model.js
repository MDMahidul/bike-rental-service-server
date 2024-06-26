"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = require("mongoose");
const bookingSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    bikeId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Bike', required: true },
    startTime: { type: Date, required: true },
    returnTime: { type: Date, default: null },
    totalCost: { type: Number, default: 0 },
    isReturned: { type: Boolean, default: false },
}, {
    toJSON: {
        // Remove the password from the output
        transform: (doc, ret) => {
            delete ret.__v;
            return ret;
        },
    },
});
exports.Booking = (0, mongoose_1.model)('Booking', bookingSchema);
