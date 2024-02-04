import { IUser } from './user.interface';
import { User } from './user.model';
import { generateUserId } from './user.utils';

const createUser = async (user: IUser): Promise<IUser | null> => {
  const id = await generateUserId();

  user.id = id;

  console.log(user, 'user data');

  const createdUser = await User.create(user);

  console.log(createdUser, 'created user');

  if (!createdUser) {
    throw new Error('Failed to create user');
  }

  return createdUser;
};

export const UserService = {
  createUser,
};