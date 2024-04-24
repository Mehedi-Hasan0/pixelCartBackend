import z from 'zod';

const updateBuyerZodSchema = z.object({
  body: z.object({
    dateOfBirth: z.string().optional(),
    gender: z.string().optional(),
    name: z.string().optional(),
    phoneNumber: z.string().optional(),
    bookingAddress: z
      .object({
        fullName: z.string().optional(),
        phoneNumber: z.string().optional(),
        state: z.string().optional(),
        city: z.string().optional(),
        area: z.string().optional(),
        houseAddress: z.string().optional(),
        landMark: z.string().optional(),
        label: z.string().optional(),
        defaultAddress: z.string().optional(),
      })
      .optional(),
  }),
});

export const BuyerValidation = {
  updateBuyerZodSchema,
};
