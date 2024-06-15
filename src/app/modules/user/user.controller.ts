import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { userServices } from './user.service';
import sendResponse from '../../utils/sendResponse';

const getUserProfile = catchAsync(async (req, res) => {
  const user = await userServices.getProfileFromDB(req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User profile retrieved successfully',
    data: user,
  });
});

const updateUserProfile = catchAsync(async (req, res) => {
  const user = await userServices.updateProfileIntoDB(req.user,req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile updated successfully',
    data: user,
  });
});

export const UserControllers = {
  getUserProfile,updateUserProfile
};
