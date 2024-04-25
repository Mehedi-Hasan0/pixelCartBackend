import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IProduct } from './product.interface';
import httpStatus from 'http-status';
import { ProductService } from './product.service';

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const productData = req.body;

  const result = await ProductService.createProduct(productData);

  sendResponse<IProduct>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product created successfully!',
    data: result,
  });
});

export const ProductController = {
  createProduct,
};
