import { JwtPayload } from 'jsonwebtoken';
import { User } from './user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { TUser } from './user.interface';

const getProfileFromDB = async (userData: JwtPayload) => {
  // checking if the user is exist
  const user = await User.isUserExistsByEmail(userData.userEmail);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  const result = await User.findOne({ email: userData.userEmail });

  return result;
};

const updateProfileIntoDB = async (
  userData: JwtPayload,
  payload: Pick<TUser, 'name' | 'email' | 'phone' | 'address'>,
) => {
  const { name, email, phone, address } = payload;
  // checking if the user is exist
  const user = await User.isUserExistsByEmail(userData.userEmail);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  const result = await User.findOneAndUpdate(
    { email: userData.userEmail },
    payload,
    { new: true },
  ).select('-createdAt -updatedAt -__v');

  return result;
};

export const userServices = {
  getProfileFromDB,
  updateProfileIntoDB,
};
