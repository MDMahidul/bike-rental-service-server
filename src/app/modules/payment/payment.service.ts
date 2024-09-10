/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { join } from 'path';
import { Booking } from '../booking/booking.model';
import { verifyPayment } from './payment.utils';
import { readFileSync } from 'fs';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const confirmationService = async (transactionId: string, status: string) => {
  const verifyResponse = await verifyPayment(transactionId);

  let result;
  let message;
  if (verifyResponse && verifyResponse.pay_status === 'Successful') {
    /* get the booking data */
    const booking = await Booking.findOne({ transactionId });
    if (!booking) {
      throw new AppError(httpStatus.NOT_FOUND, 'Booking not found!');
    }
    if (!booking.isAdvancePaid) {
      result = await Booking.findOneAndUpdate(
        { transactionId },
        { isAdvancePaid: true },
        { new: true },
      );
      message = 'Advance Successfully Paid!';
    } else if (booking.isAdvancePaid && booking.totalCost === 100) {
      message = 'Advance Already Paid!';
    } else {
      result = await Booking.findOneAndUpdate(
        { transactionId },
        { paymentStatus: 'Paid' },
        { new: true },
      );
      message = 'Payment Successfully!';
    }
  } else {
    message = 'Payment Failed!';
  }
  const filePath = join(__dirname, '../../../views/confirmation.html');

  let template = readFileSync(filePath, 'utf-8');

  template = template.replace('{{message}}', message);

  return template;
};

export const paymentServices = {
  confirmationService,
};
