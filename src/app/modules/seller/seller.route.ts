import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { SellerValidation } from './seller.validation';
import { SellerController } from './seller.controller';

const router = express.Router();

router.get('/', SellerController.getAllSeller); // only for admin

router.post(
  '/create-seller',
  validateRequest(SellerValidation.createSellerZodSchema),
  SellerController.createSeller,
);

export const SellerRoutes = router;
