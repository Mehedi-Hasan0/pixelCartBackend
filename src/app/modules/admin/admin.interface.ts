import { Model } from 'mongoose';
import { IEvent } from '../event/event.interface';

export type IAdmin = {
  id: string;
  role: string;
  name: string;
  email?: string;
  password?: string;
  event: IEvent;
};

export type AdminModel = Model<IAdmin, Record<string, unknown>>;
