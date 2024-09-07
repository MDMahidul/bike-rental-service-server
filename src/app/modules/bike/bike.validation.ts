import { z } from 'zod';

const createBikeValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required!' }).trim(),
    description: z
      .string({ required_error: 'Description is required!' })
      .trim(),
    pricePerHour: z.number({ required_error: 'Price per hour is required!' }),
    mileage: z.string({ required_error: 'Mileage is required!' }),
    isAvailable: z.boolean().default(true),
    cc: z.number({ required_error: 'CC is required!' }),
    year: z.string({ required_error: 'Year is required!' }),
    model: z.string({ required_error: 'Bike model is required!' }),
    brand: z.string({ required_error: 'Bike brand is required!' }),
    image: z.string({ required_error: 'Bike image is required!' }),
  }),
});

const updateBikeValidationSchema = z.object({
  body: z.object({
    name: z.string().trim().optional(),
    description: z.string().trim().optional(),
    pricePerHour: z.number().optional(),
    mileage: z.string().optional(),
    cc: z.number().optional(),
    year: z.string().optional(),
    model: z.string().optional(),
    brand: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const bikeValidations = {
  createBikeValidationSchema,
  updateBikeValidationSchema,
};
