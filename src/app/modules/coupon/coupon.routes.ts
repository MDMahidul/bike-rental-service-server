import express from 'express';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { couponValidations } from './coupon.validation';
import { CouponControllers } from './coupon.controller';

const router = express.Router();
router.post(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(couponValidations.couponValidationSchema),
  CouponControllers.createCoupon,
);

router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  CouponControllers.getAllCoupons,
);

router.put(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(couponValidations.couponUpdateValidationSchema),
  CouponControllers.updateSingleCoupon,
);

router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  CouponControllers.deleteCoupon,
);

export const CouponRouters = router;
