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

const getAllRental = catchAsync(async (req, res) => {
  const rental = await BookingServices.getAllRentalsFromDB(req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rentals retrieved successfully',
    data: rental,
  });
});

export const BookingControllers = { createNewBooking, returnBike, getAllRental };
