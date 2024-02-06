import { Model } from 'mongoose';

export type IEvent = {
  id: string;
  name: string;
  productId: string[];
  sellerId: string[];
  eventTime: string;
};

export type EventModel = Model<IEvent, Record<string, unknown>>;
