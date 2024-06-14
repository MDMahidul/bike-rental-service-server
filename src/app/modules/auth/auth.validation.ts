import { z } from 'zod';

const loginValidationSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Id is required' })
      .email({ message: 'Invalid email address' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

export const AuthVlidation = {
  loginValidationSchema,
};
