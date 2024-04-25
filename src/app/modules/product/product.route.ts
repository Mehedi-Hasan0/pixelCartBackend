import express from 'express';
import { ProductController } from './product.controller';
import validateRequest from '../../middlewares/validateRequest';
import { ProductValidation } from './product.valiadation';

const router = express.Router();

router.get('/', ProductController.getAllProducts);

router.get('/:id', ProductController.getSingleProducts);

router.post(
  '/create-product',
  validateRequest(ProductValidation.createProductZodSchema),
  ProductController.createProduct,
);

router.patch('/:id', ProductController.updateSingleProduct);

export const ProductRoutes = router;
