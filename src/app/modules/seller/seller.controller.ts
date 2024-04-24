import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { SellerService } from './seller.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IUser } from '../user/user.interface';
import { ISeller } from './seller.interface';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/paginationFields';

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

const getAllSeller = catchAsync(async (req: Request, res: Response) => {
  // pagination options
  const paginationOptions = pick(req.query, paginationFields);

  const result = await SellerService.getAllSeller(paginationOptions);

  sendResponse<ISeller[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Seller retreived successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleSeller = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await SellerService.getSingleSeller(id);

  sendResponse<ISeller>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Seller retreived successfully',
    data: result,
  });
});

const updateSingleSeller = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const sellerData = req.body;

  const result = await SellerService.updateSingleSeller(id, sellerData);

  sendResponse<ISeller>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Seller updated successfully',
    data: result,
  });
});

export const SellerController = {
  createSeller,
  getAllSeller,
  getSingleSeller,
  updateSingleSeller,
};
