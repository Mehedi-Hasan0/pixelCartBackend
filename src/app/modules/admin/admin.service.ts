import mongoose from 'mongoose';
import { IUser } from '../user/user.interface';
import { generateAdminId } from '../user/user.utils';
import { Admin } from './admin.model';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';

const createAdmin = async (user: IUser): Promise<IUser | null> => {
  let adminData = {
    id: '',
    role: 'admin',
    name: user.name ? user.name : '',
  };

  let newAdminAllData = null;

  //   starting session
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // generating reference id
    const id = await generateAdminId();
    // appending id to user & seller
    user.id = id;
    user.role = adminData.role;
    adminData.id = id;

    // saving seller data
    const newAdmin = await Admin.create([adminData], { session });

    // appending reference _id to user
    user.admin = newAdmin[0]._id;

    // creating user
    const newUser = await User.create([user], { session });

    if (!newUser.length || !newAdmin.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Admin');
    }

    newAdminAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  // setting & populating newUserAll data
  if (newAdminAllData) {
    newAdminAllData = await User.findOne({ id: newAdminAllData.id })
      .populate({
        path: 'admin',
      })
      .select('-password');
  }

  return newAdminAllData;
};

export const AdminService = {
  createAdmin,
};
