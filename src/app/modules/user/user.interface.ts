/* eslint-disable no-unused-vars */
import { Model, SortOrder, Types } from 'mongoose';
import { IBuyer } from '../buyer/buyer.interface';
import { ISeller } from '../seller/seller.interface';
import { IAdmin } from '../admin/admin.interface';

export type IUser = {
  id: string;
  email: string;
  password: string;
  role: string;
  name?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  gender?: string;
  buyer?: Types.ObjectId | IBuyer; // => Buyer type
  seller?: Types.ObjectId | ISeller; //  => seller type
  admin?: Types.ObjectId | IAdmin; //  => admin type
};

// export type UserModel = Model<IUser, Record<string, unknown>>;

export type UserModel = {
  isUserExist(
    id: string,
  ): Promise<Pick<IUser, 'id' | 'email' | 'role' | 'password'>>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>;
} & Model<IUser>;

export interface IPaginationOptions {
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: SortOrder;
}
