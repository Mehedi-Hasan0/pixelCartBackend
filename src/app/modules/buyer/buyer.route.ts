import express from 'express';
import { BuyerController } from './buyer.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BuyerValidation } from './buyer.validation';

const router = express.Router();

router.patch(
  '/:id',
  validateRequest(BuyerValidation.updateBuyerZodSchema),
  BuyerController.updateBuyer,
);

export const BuyerRoutes = router;
