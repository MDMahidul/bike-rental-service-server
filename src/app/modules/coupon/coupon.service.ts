import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { TCoupon } from './coupon.interface';
import { Coupon } from './coupon.model';

const createCouponIntoDB = async (payload: TCoupon) => {
  // Check if there is already an active coupon
  const activeCoupon = await Coupon.findOne({ isActive: true });

  if (activeCoupon) {
    throw new AppError(httpStatus.BAD_REQUEST,
      'An active coupon already exists. You cannot create a new coupon.',
    );
  }

  const result = await Coupon.create(payload);

  return result;
};

const getActiveCouponFromDB = async () => {
  const result =await Coupon.find({ isActive: true,isDeleted: false })

  return result;
};

const getAllCouponsFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(Coupon.find({ isDeleted: false }), query)
    .search(['code'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await userQuery.countTotal();
  const result = await userQuery.modelQuery;

  return { result, meta };
};

const updateSingleCouponIntoDB = async (
  id: string,
  payload: Partial<TCoupon>,
) => {
  const isCouponExists = await Coupon.isCouponExists(id);
  if (!isCouponExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }

  const result = await Coupon.findByIdAndUpdate(id, payload, { new: true });

  return result;
};

const deleteCoupomIntoDB = async (id: string) => {
  const isCouponExists = await Coupon.isCouponExists(id);

  if (!isCouponExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found!');
  }

  const result = await Coupon.findByIdAndDelete(id);

  return result;
};

export const CouponServices = {
  createCouponIntoDB,
  getAllCouponsFromDB,
  updateSingleCouponIntoDB,
  deleteCoupomIntoDB,
  getActiveCouponFromDB,
};
