import { Schema, model } from 'mongoose';
import { TBooking } from './booking.interface';

const bookingSchema = new Schema<TBooking>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  bikeId: { type: Schema.Types.ObjectId, ref: 'Bike', required: true },
  startTime: { type: Date, required: true },
  returnTime: { type: Date, default: null },
  totalCost: { type: Number, required:true},
  isReturned: { type: Boolean, default: false },
  transactionId: { type: String, required: true },
  isAdvancePaid: { type: Boolean, default: false },
  isCouponUsed: { type: Boolean, default: false },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending',
  },
});

export const Booking = model<TBooking>('Booking', bookingSchema);
