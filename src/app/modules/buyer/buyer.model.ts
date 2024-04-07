import { Schema, model } from 'mongoose';
import { BuyerModel, IBuyer } from './buyer.interface';

const buyerSchema = new Schema<IBuyer, BuyerModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    isVarified: {
      type: Boolean,
    },
    dateOfBirth: {
      type: String,
    },
    gender: {
      type: String,
    },
    name: {
      type: String,
    },
    phoneNumber: {
      type: Number,
    },
    bookingAddress: {
      fullName: {
        type: String,
      },
      phoneNumber: {
        type: Number,
      },
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
      defaultAddress: {
        type: String,
      },
      default: {},
    },
    return: {
      type: [String],
      default: [],
    },
    wishlist: {
      type: [String],
      default: [],
    },
    cancelledProducts: {
      type: [String],
      default: [],
    },
    followedStore: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Buyer = model<IBuyer, BuyerModel>('Buyer', buyerSchema);
