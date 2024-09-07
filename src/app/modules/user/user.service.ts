import { JwtPayload } from 'jsonwebtoken';
import { User } from './user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { TUser } from './user.interface';
import { generateUserId } from './user.utils';
import QueryBuilder from '../../builder/QueryBuilder';
import { userSearchableFields } from './user.constant';

const createUserIntoDB = async (payload: TUser) => {
  const userData: Partial<TUser> = { ...payload };
  // set generated id
  userData.id = await generateUserId();
  userData.role = 'user';
  const result = await User.create(userData);

  return result;
};

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QueryBuilder(User.find(), query)
    .search(userSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await userQuery.countTotal();
  const result = await userQuery.modelQuery;

  return { result, meta };
};

const getProfileFromDB = async (userData: JwtPayload) => {
  // checking if the user is exist
  const user = await User.isUserExistsByEmail(userData.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  const result = await User.findOne({ email: userData.email });

  return result;
};

const updateProfileIntoDB = async (
  payload: Partial<TUser>,
  userData: JwtPayload,
) => {
  // checking if the user is exist
  const user = await User.isUserExistsByEmail(userData.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  const result = await User.findOneAndUpdate(
    { email: userData.email },
    payload,
    { new: true },
  ).select('-createdAt -updatedAt -__v');

  return result;
};

const changeUserRole = async (id: string) => {
  const isUserExist = await User.findById(id);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }
  // Check if the user's role is "user"
  const newRole = isUserExist.role === 'user' ? 'admin' : 'user';

  // Update the role to "admin" instead of deleting the user
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { role: newRole },
    { new: true },
  );
  if (!updatedUser) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update user role!');
  }
  return updatedUser;
};

const deleteUser = async (id: string,) => {
  const isUserExist = await User.findById(id);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }
  const result = await User.findByIdAndUpdate(id, { isDeleted:true,new: true });

  return result;
};

export const userServices = {
  createUserIntoDB,
  getProfileFromDB,
  getAllUsersFromDB,
  updateProfileIntoDB,
  deleteUser,
  changeUserRole,
};
