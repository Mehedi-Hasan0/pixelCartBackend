import { Model } from 'mongoose';
import { IEvent } from '../event/event.interface';

export type IAdmin = {
  role: string;
  fullName: string;
  email: string;
  password: string;
  event: IEvent;
};

export type AdminModel = Model<IAdmin, Record<string, unknown>>;
