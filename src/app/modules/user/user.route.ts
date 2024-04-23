import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';

const router = express.Router();

router.get('/', UserController.getAllUser); // only admin can do this request

router.get('/:id', UserController.getSingleUser); // only admin can do this request

router.post(
  '/create-user',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser,
); // for buyers

router.delete('/:id', UserController.deleteUser); // buyer & admin

export const UserRoutes = router;
