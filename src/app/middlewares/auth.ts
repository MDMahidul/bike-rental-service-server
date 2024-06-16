import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';
import config from '../config';

/* middleware */
const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    // Check if the token is sent correctly
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You have no access to this route');
    }

    const token = authHeader.split(' ')[1];

    // check if the token sent from client
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You have no access to this route');
    }

    // check if the token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    // check user role
    const { role, userEmail } = decoded;

    // check if the user is exists
    const user = await User.isUserExistsByEmail(userEmail);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You have no access to this route');
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
