import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { SellerRoutes } from '../modules/seller/seller.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/sellers',
    route: SellerRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
