import { z } from 'zod';
import { userStatus } from './user.constant';

const createUserValidationSchema = z.object({
  body: z.object({
    user: z.object({
      name: z.string({ required_error: 'Name is required!' }).trim(),
      email: z
        .string({ required_error: 'Email is required!' })
        .email({ message: 'Invalid email address' }),
      password: z.string({ required_error: 'Password is required!' }),
      contactNo: z.string({ required_error: 'Phone number is required!' }),
      address: z.string({ required_error: 'Address is required!' }),
      role: z.string().default('user'),
    }),
  }),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    user: z.object({
      name: z.string().trim().optional(),
      email: z.string().email({ message: 'Invalid email address' }).optional(),
      contactNo: z.string().optional(),
      address: z.string().optional(),
    }),
  }),
});

const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...userStatus] as [string, ...string[]]),
  }),
});

export const userValidations = {
  createUserValidationSchema,
  updateUserValidationSchema,
  changeStatusValidationSchema,
};
