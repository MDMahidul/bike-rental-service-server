import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TBike } from './bike.interface';
import { Bike } from './bike.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { bikeSearchableFields } from './bike.constant';

const createBikeIntoDB = async (payload: TBike) => {
  const result = await Bike.create(payload);

  return result;
};

const getAllBikesFromDB = async (query: Record<string, unknown>) => {
  const bikeQuery = new QueryBuilder(Bike.find({ isDeleted: false }), query)
    .search(bikeSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await bikeQuery.countTotal();
  const result = await bikeQuery.modelQuery;

  return { result, meta };
};

const getAvailableBikesFromDB = async (query: Record<string, unknown>) => {
  const bikeQuery = new QueryBuilder(
    Bike.find({ isDeleted: false, isAvailable: true }),
    query,
  )
    .search(bikeSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await bikeQuery.countTotal();
  const result = await bikeQuery.modelQuery;

  return { result, meta };
};

const getSingleBikeFromDB = async (id: string) => {
  const isExists = await Bike.isBikeExists(id);
  if (!isExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bike not found!');
  }

  const result = Bike.findById(id);

  return result;
};

const updateSingleBikeIntoDB = async (id: string, payload: Partial<TBike>) => {
  const isBikeExists = await Bike.isBikeExists(id);

  if (!isBikeExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
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
    { isAvailable: false, isDeleted: true },
    { new: true },
  );

  return result;
};

export const BikeServices = {
  createBikeIntoDB,
  getAllBikesFromDB,
  getAvailableBikesFromDB,
  getSingleBikeFromDB,
  updateSingleBikeIntoDB,
  deleteSingleBikeIntoDB,
};
