import { Schema, model } from 'mongoose';
import { ISeller, SellerModel } from './seller.interface';

const sellerSchema = new Schema<ISeller>(
  {
    id: {
      type: String,
    },
    role: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: String,
    },
    gender: {
      type: String,
    },
    phoneNumber: {
      type: Number,
    },
    address: {
      state: {
        type: String,
      },
      city: {
        type: String,
      },
      area: {
        type: String,
      },
      houseAddress: {
        type: String,
      },
      landMark: {
        type: String,
      },
      label: {
        type: String,
      },
      default: {},
    },
    positiveSellerRatings: {
      type: Number,
      default: 0,
    },
    event: {
      id: {
        type: String,
      },
      name: {
        type: String,
      },
      productId: {
        type: [String],
        default: [],
      },
      sellerId: {
        type: [String],
        default: [],
      },
      eventTime: {
        type: String,
      },
    },
    products: {
      type: [String],
    },
  },
  {
    timestamps: true,
  },
);

export const Seller = model<ISeller, SellerModel>('Seller', sellerSchema);
