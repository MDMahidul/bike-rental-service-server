import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TBike } from './bike.interface';
import { Bike } from './bike.model';

const createBikeIntoDB = async (payload: TBike) => {
  const result = await Bike.create(payload);

  return result;
};

const getAllBikesFromDB = async () => {
  const result = await Bike.find();

  return result;
};

const updateSingleBikeIntoDB = async (id: string, payload: Partial<TBike>) => {
  const isBikeExists = await Bike.isBikeExists(id);

  if(!isBikeExists){
    throw new AppError(httpStatus.NOT_FOUND,'No Data Found')
  }

  const result = await Bike.findByIdAndUpdate(id, payload, { new: true });

  return result;
};

const deleteSingleBikeIntoDB = async (id: string) => {
   const isBikeExists = await Bike.isBikeExists(id);

   if (!isBikeExists) {
     throw new AppError(httpStatus.NOT_FOUND, 'No Data Found!');
   }

  const result = await Bike.findByIdAndUpdate(
    id,
    { isAvailable: false },
    { new: true },
  );

  return result;
};

export const BikeServices = {
  createBikeIntoDB,
  getAllBikesFromDB,
  updateSingleBikeIntoDB,
  deleteSingleBikeIntoDB,
};
