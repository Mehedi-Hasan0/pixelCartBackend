import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { SellerService } from './seller.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IUser } from '../user/user.interface';

const createSeller = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;

  const result = await SellerService.createSeller(user);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Seller created successfully',
    data: result,
  });
});

export const SellerController = {
  createSeller,
};
