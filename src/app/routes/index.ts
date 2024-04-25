import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { SellerRoutes } from '../modules/seller/seller.route';
import { AdminRoutes } from '../modules/admin/admin.route';
import { BuyerRoutes } from '../modules/buyer/buyer.route';
import { ProductRoutes } from '../modules/product/product.route';

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
  {
    path: '/buyers',
    route: BuyerRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
  {
    path: '/products',
    route: ProductRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
