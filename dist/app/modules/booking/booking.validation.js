"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingValidations = void 0;
const zod_1 = require("zod");
const bookingValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({ required_error: 'User ID is required!' }),
        bikeId: zod_1.z.string({ required_error: 'Bike ID is required!' }),
        startTime: zod_1.z.date({ required_error: 'Start time is required!' }),
        returnTime: zod_1.z.date({ required_error: 'Return time is required!' }),
        totalCost: zod_1.z.number({ required_error: 'Total cost is required!' }),
        isReturned: zod_1.z.boolean().default(false),
    }),
});
exports.bookingValidations = { bookingValidationSchema };
