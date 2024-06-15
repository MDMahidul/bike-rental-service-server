import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';
import config from '../../config';
import { User } from '../user/user.model';

const createUser = catchAsync(async (req, res) => {
  const result = await AuthServices.createUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const { email } = req.body;
  const result = await AuthServices.userLogin(req.body);
  //console.log(result);
  const { accessToken } = result;
  let user;
  if (result) {
    user = await User.findOne({ email: email }).select('-createdAt -updatedAt -__v');
  }
  /*  res.cookie({
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  }); */

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is logged in succesfully!',
    token: accessToken,
    data: user,
  });
});

export const AuthControllers = {
  createUser,
  loginUser,
};
