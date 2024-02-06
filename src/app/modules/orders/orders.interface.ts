import mongoose, { Model } from 'mongoose';
import { IBookingAddress } from '../user/user.interface';

export type IOrders = {
  productId: mongoose.Types.ObjectId;
  sellerId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  orderId: string; // "order_ItsgeicI1234" order_11 digit
  quantity: number;
  basePrice: number;
  priceToPay: number;
  shippingFee: number;
  isCouponApplied: number;
  shippingAddress: IBookingAddress;
  billingAddress: IBookingAddress;
  isBillingAndShippingAddressSame: boolean;
  paymentStatus: string;
};

export type OrdersModel = Model<IOrders, Record<string, unknown>>;
