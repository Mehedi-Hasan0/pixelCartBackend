import { Model, Types } from 'mongoose';

export type IUser = {
  id: string;
  email: string;
  password: string;
  role: string;
  name?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  gender?: string;
  buyer?: Types.ObjectId; // | IBuyer => Buyer type
  seller?: Types.ObjectId; // | ISeller => Buyer type
  admin?: Types.ObjectId; // | IAdmin => Buyer type
};

export type UserModel = Model<IUser, Record<string, unknown>>;
