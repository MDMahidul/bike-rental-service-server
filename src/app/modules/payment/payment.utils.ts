/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import config from '../../config';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

export const initiatePayment = async (paymentData: any) => {
  try {
    const response = await axios.post(config.payment_url!, {
      store_id: config.store_id,
      signature_key: config.signeture_key,
      tran_id: paymentData.transactionId,
      success_url: `https://bike-rental-service-server-puce.vercel.app/api/payment/confirmation?transactionId=${paymentData.transactionId}&status=success`,
      fail_url: `https://bike-rental-service-server-puce.vercel.app/api/payment/confirmation?status=failed`,
      cancel_url: 'https://royal-bikes-client.vercel.app',
      amount: paymentData.totalCost,
      currency: 'BDT',
      desc: 'Merchant Registration Payment',
      cus_name: paymentData.customerName,
      cus_email: paymentData.customerEmail,
      cus_add1: paymentData.customerAddress,
      cus_add2: 'N/A',
      cus_city: 'N/A',
      cus_state: 'N/A',
      cus_postcode: 'N/A',
      cus_country: 'N/A',
      cus_phone: paymentData.customerPhone,
      type: 'json',
    });
    return response.data;
  } catch (error) {
    throw new AppError(httpStatus.BAD_GATEWAY, 'Payment initiation failed!');
  }
};

export const verifyPayment = async (tnxId: string) => {
  try {
    const res = await axios.get(config.payment_verify_url!, {
      params: {
        store_id: config.store_id,
        signature_key: config.signeture_key,
        type: 'json',
        request_id: tnxId,
      },
    });
    return res.data;
  } catch (error) {
    throw new AppError(httpStatus.BAD_GATEWAY, 'Payment validation failed!');
  }
};
