import { Model } from 'mongoose';

export type IBookingAddress = {
  fullName?: string;
  phoneNumber: number;
  state: string;
  city: string;
  area: string;
  houseAddress: string;
  landMark?: string;
  label: string;
  defaultAddress?: string;
};

export type IBuyer = {
  id: string;
  role: string;
  isVarified: boolean;
  dateOfBirth: string;
  gender: string;
  name: string;
  phoneNumber: number;
  bookingAddress: IBookingAddress;
  return: string[];
  wishlist: string[];
  cancelledProducts: string[];
  followedStore: string[];
};

export type BuyerModel = Model<IBuyer, Record<string, unknown>>;
