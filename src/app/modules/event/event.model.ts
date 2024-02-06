import { Schema, model } from 'mongoose';
import { EventModel, IEvent } from './event.interface';

const eventSchema = new Schema<IEvent>(
  {
    id: {
      type: String,
    },
    name: {
      type: String,
    },
    productId: {
      type: [String],
    },
    sellerId: {
      type: [String],
    },
    eventTime: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const Event = model<IEvent, EventModel>('Event', eventSchema);
