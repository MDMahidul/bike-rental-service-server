import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Bike } from '../bike/bike.model';
import { TBooking } from './booking.interface';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '../user/user.model';
import { Booking } from './booking.model';
import { initiatePayment } from '../payment/payment.utils';
import QueryBuilder from '../../builder/QueryBuilder';
import { bookingSearchableFields } from './booking.constant';

const createRentalIntoDB = async (payload: TBooking, userData: JwtPayload) => {
  const { bikeId, totalCost } = payload;

  // Check if user exists
  const { email } = userData;
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  // Check if user has an active rental
  const userActiveRental = await Booking.findOne({
    userId: user._id,
    isReturned: false,
  });
  if (userActiveRental) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'User already has an active rental!',
    );
  }

  // Check if bike exists and is available
  const bike = await Bike.findById(bikeId);
  if (!bike) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bike not found!');
  }
  if (!bike.isAvailable) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Bike is not available!');
  }

  // Prepare payment data
  const transactionId = `TXN-${Date.now()}`;
  const paymentData = {
    transactionId,
    totalCost,
    customerName: user.name,
    customerEmail: user.email,
    customerAddress: user.address,
    customerPhone: user.contactNo,
  };

  // Initiate payment
  let paymentSession;
  try {
    paymentSession = await initiatePayment(paymentData);
  } catch (error) {
    throw new AppError(
      httpStatus.PAYMENT_REQUIRED,
      'Payment initiation failed!',
    );
  }

  // Payment successful, create the booking and update bike status
  const booking = new Booking({
    ...payload,
    transactionId,
    userId: user._id,
  });

  try {
    // Save booking after payment success
    await booking.save();

    // Update bike availability to false
    await Bike.findByIdAndUpdate(bikeId, { isAvailable: false }, { new: true });
  } catch (error) {
    // In case of error, log the issue and ensure bike availability is not changed
    console.error('Booking creation failed:', error);
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Booking creation failed after payment!',
    );
  }

  return paymentSession;
};


const returnRental = async (id: string) => {
  // check the rental id
  const rental = await Booking.findById(id);
  if (!rental) {
    throw new AppError(httpStatus.NOT_FOUND, 'Rental not found!');
  }

  // check if the rental has been returned
  if (rental.isReturned) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Bike has already been returned!',
    );
  }
  //check the bike
  const bike = await Bike.findById(rental.bikeId);
  if (!bike) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bike not found!');
  }

  // now calculate the total cost
  const returnTime = new Date();
  const durationHours = Number(
    (
      (returnTime.getTime() - rental.startTime.getTime()) /
      (1000 * 3600)
    ).toFixed(2),
  );

  const totalCost = (durationHours * bike.pricePerHour).toFixed(2);

  // now update the rental info
  rental.returnTime = returnTime;
  rental.totalCost = Number(totalCost);
  rental.isReturned = true;
  await rental.save();

  // also Update the bike's availability
  bike.isAvailable = true;
  await bike.save();

  return rental;
};

const getAllRentalsFromDB = async (query: Record<string, unknown>,userData: JwtPayload) => {
  const user = await User.findOne({ email: userData.email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  const bookingQuery = new QueryBuilder(Booking.find(), query)
    .search(bookingSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await bookingQuery.countTotal();
  const result = await bookingQuery.modelQuery;

  return { result, meta };

};
export const BookingServices = {
  createRentalIntoDB,
  returnRental,
  getAllRentalsFromDB,
};
