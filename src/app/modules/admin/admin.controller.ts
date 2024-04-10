import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { IUser } from '../user/user.interface';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { AdminService } from './admin.service';

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;

  const result = await AdminService.createAdmin(user);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin created successfully',
    data: result,
  });
});

export const AdminController = {
  createAdmin,
};
