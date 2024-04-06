import { z } from 'zod';

const productsValidation = z.object({
  id: z.string(),
  // sellerId:
});

const createSellerValidation = z.object({
  body: z.object({
    id: z.string({
      required_error: 'Id is required',
    }),
    role: z.string({
      required_error: 'Role is required',
    }),
    fullName: z.string({
      required_error: 'Name is required',
    }),
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(6, { message: 'Password should be at least 6 characters' }),
  }),
  dateOfBirth: z.string().optional(),
  gender: z.string().optional(),
  phoneNumber: z.number({
    required_error: 'Phone number is required',
  }),
  address: z.object({
    state: z.string(),
    city: z.string(),
    area: z.string(),
    houseAddress: z.string(),
    landMark: z.string(),
    label: z.string().optional(),
  }),
  positiveSellerRatings: z.string(),
  event: z.object({
    id: z.string(),
    name: z.string(),
    productId: z.array(z.string()),
    sellerId: z.array(z.string()),
    eventTime: z.string(),
  }),
  // products: // create products validation
});

export const SellerValidation = {
  createSellerValidation,
};
