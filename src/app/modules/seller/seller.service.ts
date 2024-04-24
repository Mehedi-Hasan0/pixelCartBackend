import mongoose, { SortOrder } from 'mongoose';
import { generateSellerId } from '../user/user.utils';
import { Seller } from './seller.model';
import { IPaginationOptions, IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { paginationHelper } from '../../../helpers/paginationHelpers';
import { IGenericResponse } from '../../../types';
import { ISeller } from './seller.interface';

const createSeller = async (user: IUser): Promise<IUser | null> => {
  const sellerData = {
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

const getAllSeller = async (
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<ISeller[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  // sort conditions
  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  // TODO: maybe we need to populate products after poduct is available
  const allSellerData = await Seller.find({})
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Seller.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: allSellerData,
  };
};

const getSingleSeller = async (id: string): Promise<ISeller | null> => {
  const singleSeller = await Seller.findById({ _id: id });

  return singleSeller;
};

export const SellerService = {
  createSeller,
  getAllSeller,
  getSingleSeller,
};
