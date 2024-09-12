import express from 'express';
import auth from '../../middlewares/auth';
import { BookingControllers } from './booking.controller';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();


router.post('/', auth(USER_ROLE.user), BookingControllers.createNewBooking);

router.put(
  '/:id/return',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  BookingControllers.returnBike,
);

router.get(
  '/:id',
  auth(USER_ROLE.user),
  BookingControllers.getUserSingleRental,
);

router.get('/', auth(USER_ROLE.user), BookingControllers.getUserRental);

router.get(
  '/all-rentals',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  BookingControllers.getAllRental,
);

router.put(
  '/apply-coupon',
  auth(USER_ROLE.user),
  BookingControllers.applyCoupon,
);

router.put(
  '/make-payment',
  auth(USER_ROLE.user),
  BookingControllers.makePayment,
);

export const BookingRouters = router;
