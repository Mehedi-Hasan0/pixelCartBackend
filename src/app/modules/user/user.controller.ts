import { Request, Response } from 'express';
import { UserService } from './user.service';

const createUser = async (req: Request, res: Response) => {
  const user = req.body;

  const result = UserService.createUser(user);

  console.log(result, 'result');

  res.status(200).json({
    success: true,
    message: 'User created successfully',
    data: result,
  });
};

export const UserController = {
  createUser,
};
