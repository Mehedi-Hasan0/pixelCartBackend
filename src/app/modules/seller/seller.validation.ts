import { z } from 'zod';

const productsValidation = z.object({
  id: z.string(),
  // sellerId:
});

const createSellerZodSchema = z.object({
  body: z.object({
    role: z.string().optional(),
    name: z.string({
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
    phoneNumber: z.string({
      required_error: 'Phone number is required',
    }),
  }),
  dateOfBirth: z.string().optional(),
  gender: z.string().optional(),
  address: z
    .object({
      state: z.string(),
      city: z.string(),
      area: z.string(),
      houseAddress: z.string(),
      landMark: z.string(),
      label: z.string().optional(),
    })
    .optional(),
  positiveSellerRatings: z.string().optional(),
  event: z
    .object({
      id: z.string(),
      name: z.string(),
      productId: z.array(z.string()),
      sellerId: z.array(z.string()),
      eventTime: z.string(),
    })
    .optional(),
  // products: // create products validation
});

export const SellerValidation = {
  createSellerZodSchema,
};
