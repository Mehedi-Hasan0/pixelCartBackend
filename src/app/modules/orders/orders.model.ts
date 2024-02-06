import { Schema, model } from 'mongoose';
import { IOrders, OrdersModel } from './orders.interface';

const ordersSchema = new Schema<IOrders>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: 'Seller',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderId: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    basePrice: {
      type: Number,
      required: true,
    },
    priceToPay: {
      type: Number,
      required: true,
    },
    shippingFee: {
      type: Number,
      required: true,
    },
    isCouponApplied: {
      type: Number,
    },
    shippingAddress: {
      fullName: {
        type: String,
      },
      phoneNumber: {
        type: Number,
      },
      state: {
        type: String,
      },
      city: {
        type: String,
      },
      area: {
        type: String,
      },
      houseAddress: {
        type: String,
      },
      landMark: {
        type: String,
      },
      label: {
        type: String,
      },
      defaultAddress: {
        type: String,
      },
      default: {},
    },
    billingAddress: {
      fullName: {
        type: String,
      },
      phoneNumber: {
        type: Number,
      },
      state: {
        type: String,
      },
      city: {
        type: String,
      },
      area: {
        type: String,
      },
      houseAddress: {
        type: String,
      },
      landMark: {
        type: String,
      },
      label: {
        type: String,
      },
      defaultAddress: {
        type: String,
      },
      default: {},
    },
    isBillingAndShippingAddressSame: {
      type: Boolean,
    },
    paymentStatus: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const Orders = model<IOrders, OrdersModel>('Orders', ordersSchema);
