import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IProduct } from './product.interface';
import httpStatus from 'http-status';
import { ProductService } from './product.service';
import pick from '../../../shared/pick';
import { productFilterableFields } from './product.constant';
import { paginationFields } from '../../../constants/paginationFields';

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

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const filtersData = pick(req.query, productFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await ProductService.getAllProducts(
    filtersData,
    paginationOptions,
  );

  sendResponse<IProduct[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product retrieved successfully!',
    meta: result.meta,
    data: result.data,
  });
});

export const ProductController = {
  createProduct,
  getAllProducts,
};
