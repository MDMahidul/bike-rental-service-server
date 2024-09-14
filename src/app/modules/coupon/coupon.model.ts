import { Schema, model } from 'mongoose';
import { DiscountType } from './coupon.constant';
import { CouponModel, TCoupon } from './coupon.interface';

const couponSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  discountType: {
    type: String,
    enum: DiscountType,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
  discountValue: {
    type: Number,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

// create static function
couponSchema.statics.isCouponExists = async function (id: string) {
  return await Coupon.findById(id);
};

export const Coupon = model<TCoupon, CouponModel>('Coupon', couponSchema);
