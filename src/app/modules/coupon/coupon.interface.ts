/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TDiscount = 'percentage' | 'fixed';

export type TCoupon = {
  code: string;
  discountType: TDiscount;
  discountValue: number;
  endDate: Date;
  isActive: boolean;
  isDeleted:boolean;
};

// function defination
export interface CouponModel extends Model<TCoupon> {
  isCouponExists(id: string): Promise<boolean>;
}
