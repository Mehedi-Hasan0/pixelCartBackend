import { z } from 'zod';

const createUserZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
    dateOfBirth: z.string().optional(),
    gender: z.string().optional(),
    phoneNumber: z.string().min(11, {
      message: 'Phone number must be at least 11 digits',
    }),
  }),
});

export const UserValidation = {
  createUserZodSchema,
};
