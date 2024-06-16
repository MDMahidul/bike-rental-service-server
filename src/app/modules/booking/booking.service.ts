import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Bike } from '../bike/bike.model';
import { TBooking } from './booking.interface';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '../user/user.model';
import { Booking } from './booking.model';

const createRentalIntoDB = async (payload: TBooking, userData: JwtPayload) => {
  const { bikeId, startTime } = payload;

  // Check if bike exists and isavailable
  const bike = await Bike.findById(bikeId);
  if (!bike) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bike not found!');
  }
  if (!bike.isAvailable) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Bike is not available!');
  }

  // Check if user exists
  const { userEmail } = userData;
  const user = await User.findOne({ email: userEmail });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  // check if user has an active rental
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

  // Create the booking
  const booking = new Booking({
    ...payload,
    userId: user._id,
  });

  // Update bike availability to false
  await Bike.findByIdAndUpdate(bikeId, { isAvailable: false }, { new: true });

  const result = await booking.save();

  return result;
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

const getAllRentalsFromDB = async (userData: JwtPayload) => {
  const user = await User.findOne({ email: userData.userEmail });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  const result = await Booking.find({ userId: user._id });

  if(!result){
    throw new AppError(httpStatus.NOT_FOUND,'No data found for this user')
  }

  return result;
};
export const BookingServices = {
  createRentalIntoDB,
  returnRental,
  getAllRentalsFromDB,
};
