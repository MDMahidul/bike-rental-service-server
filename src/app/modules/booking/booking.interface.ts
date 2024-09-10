import { Types } from 'mongoose';

export type TBooking = {
  userId: Types.ObjectId;
  bikeId: Types.ObjectId;
  startTime: Date;
  returnTime: Date;
  totalCost: number;
  isCouponUsed: boolean;
  isAdvancePaid: boolean;
  transactionId: string;
  paymentStatus: string;
  isReturned: boolean;
};
