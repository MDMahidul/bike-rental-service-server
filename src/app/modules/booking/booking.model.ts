import { Schema, model } from 'mongoose';
import { TBooking } from './booking.interface';

const bookingSchema = new Schema<TBooking>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    bikeId: { type: Schema.Types.ObjectId, ref: 'Bike', required: true },
    startTime: { type: Date, required: true },
    returnTime: { type: Date, default: null },
    totalCost: { type: Number, default: 0 },
    isReturned: { type: Boolean, default: false },
  },
  {
    toJSON: {
      // Remove the password from the output
      transform: (doc, ret) => {
        delete ret.__v;
        return ret;
      },
    },
  },
);

export const Booking = model<TBooking>('Booking', bookingSchema);
