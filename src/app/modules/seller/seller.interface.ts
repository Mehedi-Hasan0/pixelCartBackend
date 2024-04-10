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
  name: string;
  email: string;
  password: string;
  phoneNumber: number;
  isVarified?: boolean;
  dateOfBirth?: string;
  gender?: string;
  address?: ISellerAddress;
  positiveSellerRatings?: number;
  event?: IEvent;
  products?: IProduct[]; // have to import from products interface
};

export type SellerModel = Model<ISeller, Record<string, unknown>>;
