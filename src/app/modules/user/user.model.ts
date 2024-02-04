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
        required: true,
      },
      mobileNumber: {
        type: Number,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      area: {
        type: String,
        required: true,
      },
      houseAddress: {
        type: String,
        required: true,
      },
      landMark: {
        type: String,
        required: true,
      },
      label: {
        type: String,
        required: true,
      },
      defaultAddress: {
        type: String,
        required: true,
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
