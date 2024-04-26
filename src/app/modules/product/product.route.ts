import express from 'express';
import { ProductController } from './product.controller';
import validateRequest from '../../middlewares/validateRequest';
import { ProductValidation } from './product.valiadation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.get('/', ProductController.getAllProducts); // for all

router.get('/:id', ProductController.getSingleProducts); // for all

router.post(
  '/create-product',
  validateRequest(ProductValidation.createProductZodSchema),
  auth(ENUM_USER_ROLE.SELLER),
  ProductController.createProduct,
); // for seller only

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SELLER),
  ProductController.updateSingleProduct,
); // for seller only

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.ADMIN),
  ProductController.deleteProduct,
); // for seller & admin

export const ProductRoutes = router;
