import { z } from 'zod';

// const productsValidation = z.object({
//   id: z.string(),
//   // sellerId:
// });

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
  }),
});

const updateSellerZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    phoneNumber: z.string().optional(),
    dateOfBirth: z.string().optional(),
    gender: z.string().optional(),
    address: z
      .object({
        state: z.string().optional(),
        city: z.string().optional(),
        area: z.string().optional(),
        houseAddress: z.string().optional(),
        landMark: z.string().optional(),
        label: z.string().optional(),
      })
      .optional(),
  }),
});

export const SellerValidation = {
  createSellerZodSchema,
  updateSellerZodSchema,
};
