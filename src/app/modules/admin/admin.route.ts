import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from '../user/user.validation';
import { AdminController } from './admin.controller';

const router = express.Router();

router.post(
  '/create-admin',
  validateRequest(UserValidation.createUserZodSchema),
  AdminController.createAdmin,
);

export const AdminRoutes = router;
