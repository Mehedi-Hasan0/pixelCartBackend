import mongoose from 'mongoose';
import { ISeller } from './seller.interface';
import { generateSellerId } from '../user/user.utils';
import { Seller } from './seller.model';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const createSeller = async (user: IUser) => {
  let sellerData = {
    id: '',
    role: 'seller',
    name: user.name ? user.name : '',
    phoneNumber: user.phoneNumber ? user.phoneNumber : '',
    dateOfBirth: user.dateOfBirth ? user.dateOfBirth : '',
    gender: user.gender ? user.gender : '',
  };

  let newSellerAllData = null;

  //   starting session
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // generating reference id
    const id = await generateSellerId();
    // appending id to user & seller
    user.id = id;
    user.role = sellerData.role;
    sellerData.id = id;

    // saving seller data
    const newSeller = await Seller.create([sellerData], { session });

    // appending reference _id to user
    user.seller = newSeller[0]._id;

    // creating user
    const newUser = await User.create([user], { session });

    if (!newUser.length || !newSeller.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Seller');
    }

    newSellerAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  // setting & populating newUserAll data
  if (newSellerAllData) {
    newSellerAllData = await User.findOne({ id: newSellerAllData.id })
      .populate({
        path: 'seller',
      })
      .select('-password');
  }

  return newSellerAllData;
};

export const SellerService = {
  createSeller,
};
