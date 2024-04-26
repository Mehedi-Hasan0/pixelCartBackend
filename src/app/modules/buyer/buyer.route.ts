import express from 'express';
import { BuyerController } from './buyer.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BuyerValidation } from './buyer.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.patch(
  '/:id',
  validateRequest(BuyerValidation.updateBuyerZodSchema),
  auth(ENUM_USER_ROLE.BUYER),
  BuyerController.updateBuyer,
); // for buyer only

export const BuyerRoutes = router;
