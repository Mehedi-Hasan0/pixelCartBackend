import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';

const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'user',
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
    varified: {
      type: Number,
    },
    dateOfBirth: {
      type: String,
    },
    gender: {
      type: String,
    },
    phoneNumber: {
      type: Number,
      required: true,
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
    },
    return: {
      type: [String],
      default: [],
    },
    cancellation: {
      type: [String],
      default: [],
    },
    wishlist: {
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
  },
);

export const User = model<IUser, UserModel>('User', userSchema);
