/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IBuyer } from './buyer.interface';
import { Buyer } from './buyer.model';

const updateBuyer = async (
  id: string,
  buyerData: Partial<IBuyer>,
): Promise<IBuyer | null> => {
  const { bookingAddress, ...otherBuyerData } = buyerData;

  const updatedBuyerData = { ...otherBuyerData };

  const buyer = await Buyer.findById({ _id: id });

  if (!buyer) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Buyer not found!');
  }

  // handling embedded field update
  if (bookingAddress && Object.keys(bookingAddress).length > 0) {
    Object.keys(bookingAddress).forEach(key => {
      const bookingAddressKey =
        `bookingAddress.${key}` as keyof Partial<IBuyer>;

      (updatedBuyerData as any)[bookingAddressKey] =
        bookingAddress[key as keyof typeof bookingAddress];
    });
  }

  // updating in the DB
  const newUpdatedBuyer = await Buyer.findOneAndUpdate(
    { _id: id },
    updatedBuyerData,
    { new: true },
  );

  return newUpdatedBuyer;
};

export const BuyerService = {
  updateBuyer,
};
