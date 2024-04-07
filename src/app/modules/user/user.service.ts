import mongoose from 'mongoose';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateBuyerId } from './user.utils';
import { Buyer } from '../buyer/buyer.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const createUser = async (user: IUser): Promise<IUser | null> => {
  let buyerData = {
    id: '',
    role: 'buyer',
    name: user.name ? user.name : '',
    phoneNumber: user.phoneNumber ? user.phoneNumber : '',
    dateOfBirth: user.dateOfBirth ? user.dateOfBirth : '',
    gender: user.gender ? user.gender : '',
  };
  let newUserAllData = null;
  // 1st start a session
  const session = await mongoose.startSession();
  try {
    session.startTransaction(); // 2nd start transaction
    // creating custom id
    const id = await generateBuyerId();
    // appenidng to user & buyer data
    user.id = id;
    buyerData.id = id;

    // saving buyer data
    const newBuyer = await Buyer.create([buyerData], { session });

    user.buyer = newBuyer[0]._id; // appending reference _id to user

    // creating user
    const newUser = await User.create([user], { session }); // returns array of saved user

    if (!newUser.length || !newBuyer.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user.');
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction(); // rolls back to previous state of the database
    await session.endSession();
    throw error;
  }

  // setting & populating newUserAll data
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id })
      .populate({
        path: 'buyer',
      })
      .select('-password');
  }

  return newUserAllData;
};

export const UserService = {
  createUser,
};
