import { Router } from 'express';
import { AuthRouters } from '../modules/auth/auth.routes';
import { UserRouters } from '../modules/user/user.routes';
import { BikeRouters } from '../modules/bike/bike.routes';
import { BookingRouters } from '../modules/booking/booking.routes';
import { CouponRouters } from '../modules/coupon/coupon.routes';

const router = Router();

const modeleRoutes = [
  {
    path: '/auth',
    route: AuthRouters,
  },
  {
    path: '/user',
    route: UserRouters,
  },
  {
    path: '/bikes',
    route: BikeRouters,
  },
  {
    path: '/rentals',
    route: BookingRouters,
  },
  {
    path: '/coupons',
    route: CouponRouters,
  },
];

modeleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
