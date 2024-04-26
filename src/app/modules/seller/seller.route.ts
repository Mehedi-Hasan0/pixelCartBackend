import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SellerValidation } from './seller.validation';
import { SellerController } from './seller.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.get('/', auth(ENUM_USER_ROLE.ADMIN), SellerController.getAllSeller); // only for admin

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  SellerController.getSingleSeller,
); // only for admin

router.post(
  '/create-seller',
  validateRequest(SellerValidation.createSellerZodSchema),
  SellerController.createSeller,
); // for seller

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SELLER),
  validateRequest(SellerValidation.updateSellerZodSchema),
  SellerController.updateSingleSeller,
); // for seller

export const SellerRoutes = router;
