import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TLogin } from './auth.interface';
import { createToken, verifyToken } from './auth.utils';
import config from '../../config';
import { sendMail } from '../../utils/sendEmail';
import bcrypt from 'bcrypt';
import { User } from '../user/user.model';

const loginUser = async (payload: TLogin) => {
  /* check if the user exists */
  const user = await User.isUserExistsByEmail(payload.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'No user found !');
  }

  /* check if the user is already deleted */
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  // checking if the user is blocked
  const userStatus = user?.status;
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked !');
  }

  //checking if the password is correct
  const password = await User.isPasswordMatched(
    payload?.password,
    user?.password,
  );
  if (!password) {
    throw new AppError(httpStatus.FORBIDDEN, 'Incorrect Password !');
  }

  /* create token and send to the client */
  const jwtPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
    isFirstRide:user.isFirstRide
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return { accessToken, refreshToken };
};

const refreshToken = async (token: string) => {
  /* check the given token */
  const decoded = verifyToken(token, config.jwt_refresh_secret as string);

  const { email, iat } = decoded;

  /* check if the user exists */
  const user = await User.isUserExistsByEmail(email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  /* checking if the user is already deleted */
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  // checking if the user is blocked
  const userStatus = user?.status;
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked !');
  }

  /* check if the time */
  if (
    user.passwordChangedAt &&
    User.isJWTIssuedBeforePasswordChange(user.passwordChangedAt, iat as number)
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
  }

  const jwtPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
    isFirstRide: user.isFirstRide,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

const forgetPassword = async (email: string) => {
  /* check if the user exists */
  const user = await User.isUserExistsByEmail(email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  /* checking if the user is already deleted */
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  // checking if the user is blocked
  const userStatus = user?.status;
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked !');
  }

  const jwtPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
    isFirstRide: user.isFirstRide,
  };

  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '10m',
  );

  const resetUILink = `${config.reset_pass_ui_link}?email=${user.email}&token=${resetToken}`;

  sendMail(user.email, resetUILink);
};

const resetPassword = async (
  token: string,
  payload: { newPassword: string; email: string; id: string },
) => {
  /* check if the user exists */
  const user = await User.isUserExistsByEmail(payload?.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  /* checking if the user is already deleted */
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  // checking if the user is blocked
  const userStatus = user?.status;
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked !');
  }

  /* check if the given token is valid  */
  const decoded = verifyToken(token, config.jwt_access_secret as string);

  if (payload?.email !== decoded.email) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are forbidden!');
  }

  /* hash the new pass */
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    { email: decoded.email, role: decoded.role },
    { password: newHashedPassword, passwordChangedAt: new Date() },
  );

  return null;
};

export const AuthServices = {
  loginUser,
  refreshToken,
  forgetPassword,
  resetPassword,
};
