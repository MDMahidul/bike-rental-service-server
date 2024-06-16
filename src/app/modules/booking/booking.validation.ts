import { z } from 'zod';

const bookingValidationSchema = z.object({
  body: z.object({
    userId: z.string({ required_error: 'User ID is required!' }),
    bikeId: z.string({ required_error: 'Bike ID is required!' }),
    startTime: z.date({ required_error: 'Start time is required!' }),
    returnTime: z.date({ required_error: 'Return time is required!' }),
    totalCost: z.number({ required_error: 'Total cost is required!' }),
    isReturned: z.boolean().default(false),
  }),
});

export const bookingValidations = {bookingValidationSchema}