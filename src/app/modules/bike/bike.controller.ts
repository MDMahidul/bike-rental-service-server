import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BikeServices } from './bike.service';

const createBike = catchAsync(async (req, res) => {
  const result = await BikeServices.createBikeIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bike added successfully',
    data: result,
  });
});

const getAllBikes = catchAsync(async (req, res) => {
  const result = await BikeServices.getAllBikesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bikes retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getAvailableBikes = catchAsync(async (req, res) => {
  const result = await BikeServices.getAvailableBikesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Available Bikes retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleBikes = catchAsync(async (req, res) => {
  const {id}=req.params;
  const result = await BikeServices.getSingleBikeFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bike data retrieved successfully!',
    data: result,
  });
});

const updateSingleBike = catchAsync(async (req, res) => {
    const {id}=req.params;
  const result = await BikeServices.updateSingleBikeIntoDB(id,req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bike updated successfully',
    data: result,
  });
});

const deleteSingleBike = catchAsync(async (req, res) => {
    const {id}=req.params;
  const result = await BikeServices.deleteSingleBikeIntoDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bike deleted successfully',
    data: result,
  });
});

export const BikeControllers = {
  createBike,
  getAllBikes,
  getAvailableBikes,
  getSingleBikes,
  updateSingleBike,
  deleteSingleBike,
};
