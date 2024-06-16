"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bikeValidations = void 0;
const zod_1 = require("zod");
const createBikeValidationSchema = zod_1.z.object({
    name: zod_1.z.string({ required_error: 'Name is required!' }).trim(),
    description: zod_1.z.string({ required_error: 'Description is required!' }).trim(),
    pricePerHour: zod_1.z.number({ required_error: 'Price per hour is required!' }),
    isAvailable: zod_1.z.boolean().default(true),
    cc: zod_1.z.number({ required_error: 'CC is required!' }),
    year: zod_1.z.number({ required_error: 'Year is required!' }),
    model: zod_1.z.string({ required_error: 'Bike model is required!' }),
    brand: zod_1.z.string({ required_error: 'Bike brand is required!' }),
});
const updateBikeValidationSchema = zod_1.z.object({
    name: zod_1.z.string().trim().optional(),
    description: zod_1.z.string().trim().optional(),
    pricePerHour: zod_1.z.number().optional(),
    cc: zod_1.z.number().optional(),
    year: zod_1.z.number().optional(),
    model: zod_1.z.string().optional(),
    brand: zod_1.z.string().optional(),
});
exports.bikeValidations = {
    createBikeValidationSchema,
    updateBikeValidationSchema,
};
