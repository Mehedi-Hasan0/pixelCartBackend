import express from 'express';
import { ProductController } from './product.controller';
import validateRequest from '../../middlewares/validateRequest';
import { ProductValidation } from './product.valiadation';

const router = express.Router();

router.post(
  '/create-product',
  validateRequest(ProductValidation.createProductZodSchema),
  ProductController.createProduct,
);

export const ProductRoutes = router;
