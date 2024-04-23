import { Schema, model } from 'mongoose';
import { AdminModel, IAdmin } from './admin.interface';

const adminSchema = new Schema<IAdmin>(
  {
    id: {
      type: String,
    },
    role: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    event: {
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
  },
  {
    timestamps: true,
  },
);

export const Admin = model<IAdmin, AdminModel>('Admin', adminSchema);
