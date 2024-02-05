import { Model } from 'mongoose';

export type IBookingAddress = {
  fullName: string;
  phoneNumber: number;
  state: string;
  city: string;
  area: string;
  houseAddress: string;
  landMark?: string;
  label: string;
  defaultAddress?: string;
};

export type IUser = {
  id: string;
  fullName: string;
  role: string;
  email: string;
  password: string;
  varified: number;
  dateOfBirth: string;
  gender: string;
  phoneNumber: number;
  bookingAddress: IBookingAddress;
  return: string[];
  cancellation: string[];
  wishlist: string[];
  followedStore: string[];
};

export type UserModel = Model<IUser, Record<string, unknown>>;
