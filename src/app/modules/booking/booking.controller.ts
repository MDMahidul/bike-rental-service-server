import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingServices } from './booking.service';

const createNewBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.createRentalIntoDB(req.body, req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rental created successfully',
    data: result,
  });
});

const returnBike = catchAsync(async (req, res) => {
  const { id } = req.params;
  const rental = await BookingServices.returnRental(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bike returned successfully',
    data: rental,
  });
});

const getUserRental = catchAsync(async (req, res) => {
  const result = await BookingServices.getUserRentalsFromDB(
    req.query,
    req.user,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rentals retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getUserSingleRental = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingServices.getUserSingleRentalFromDB(id, req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rentals retrieved successfully',
    data: result,
  });
});

const getAllRental = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllRentalsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rentals retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const applyCoupon = catchAsync(async (req, res) => {
  const { bookingId, couponCode } = req.body;
  const result = await BookingServices.applyCouponFromDB({
    bookingId,
    couponCode,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Coupon applied successfully!',
    data: result,
  });
});

const makePayment = catchAsync(async (req, res) => {
  const result = await BookingServices.makeThePayemnt(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rental cost paid successfully!',
    data: result,
  });
});

export const BookingControllers = {
  createNewBooking,
  returnBike,
  getUserRental,
  getAllRental,
  getUserSingleRental,
  applyCoupon,
  makePayment,
};
