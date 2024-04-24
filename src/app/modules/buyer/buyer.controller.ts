import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { BuyerService } from './buyer.service';
import sendResponse from '../../../shared/sendResponse';
import { IBuyer } from './buyer.interface';
import httpStatus from 'http-status';

const updateBuyer = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const buyerData = req.body;

  const result = await BuyerService.updateBuyer(id, buyerData);

  sendResponse<IBuyer>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Buyer updated successfully',
    data: result,
  });
});

export const BuyerController = {
  updateBuyer,
};
