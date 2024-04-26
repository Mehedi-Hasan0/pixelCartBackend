import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUser); // only admin can do this request

router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.getSingleUser); // only admin can do this request

router.post(
  '/create-user',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser,
); // for buyers

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.ADMIN),
  UserController.deleteUser,
); // buyer & admin

export const UserRoutes = router;
