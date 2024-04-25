import { z } from 'zod';

const createProductZodSchema = z.object({
  body: z.object({
    sellerId: z.string(),
    title: z.string(),
    brand: z.string().optional(),
    price: z.string(),
    quantity: z.string(),
    category: z.string(),
    discountedPrice: z.string().optional(),
    discountPercent: z.string().optional(),
    productDetails: z.string(),
    specification: z.string().optional(),
    warranty: z.string().optional(),
  }),
});

export const ProductValidation = {
  createProductZodSchema,
};
