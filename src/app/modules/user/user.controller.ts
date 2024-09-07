import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { userServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import { RequestHandler } from 'express';

const createUser = catchAsync(async (req, res) => {
  const { user: userData } = req.body;

  const result = await userServices.createUserIntoDB(userData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User is created successfully',
    data: result,
  });
});

const getAllUsers: RequestHandler = catchAsync(async (req, res) => {
  const result = await userServices.getAllUsersFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Users data retrieved successfully!',
    meta: result.meta,
    data: result.result,
  });
});

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
  const { user } = req.body;
  const result = await userServices.updateProfileIntoDB(user, req.user);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User updated successfully !',
    data: result,
  });
});

const changeUserRole = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await userServices.changeUserRole(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User role changed  successfully!',
    data: result,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const {id} = req.params;

  const result = await userServices.deleteUser(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User deleted successfully!',
    data: result,
  });
});

export const UserControllers = {
  createUser,
  getUserProfile,
  getAllUsers,
  updateUserProfile,
  changeUserRole,
  deleteUser,
};
