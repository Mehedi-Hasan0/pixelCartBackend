import { Model } from 'mongoose';
import { IEvent } from '../event/event.interface';
import { IProduct } from '../product/product.interface';

type ISellerAddress = {
  state: string;
  city: string;
  area: string;
  houseAddress: string;
  landMark?: string;
  label: string;
};

export type ISeller = {
  id: string;
  role: string;
  fullName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  gender: string;
  phoneNumber: number;
  address: ISellerAddress;
  positiveSellerRatings: number;
  event: IEvent;
  products: IProduct[]; // have to import from products interface
};

export type SellerModel = Model<ISeller, Record<string, unknown>>;
