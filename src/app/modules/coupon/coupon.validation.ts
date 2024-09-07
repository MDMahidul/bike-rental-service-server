import { z } from 'zod';
import { DiscountType } from './coupon.constant';

const couponValidationSchema = z.object({
  body: z.object({
    code: z.string().min(1, 'Coupon code is required'),
    discountType: z.enum([...DiscountType] as [string, ...string[]], {}),
    discountValue: z
      .number()
      .min(0, 'Discount value must be a positive number'),
    endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: 'Invalid date format',
    }),
    isActive: z.boolean().optional().default(true),
  }),
});

const couponUpdateValidationSchema = z.object({
  body: z.object({
    code: z.string().min(1, 'Coupon code is required').optional(),
    discountType: z
      .enum([...DiscountType] as [string, ...string[]])
      .optional(),
    discountValue: z
      .number()
      .min(0, 'Discount value must be a positive number')
      .optional(),
    endDate: z
      .string()
      .refine((date) => !isNaN(Date.parse(date)), {
        message: 'Invalid date format',
      })
      .optional(),
    isActive: z.boolean().optional().default(true),
  }),
});


export const couponValidations = {
  couponValidationSchema,
  couponUpdateValidationSchema,
};
