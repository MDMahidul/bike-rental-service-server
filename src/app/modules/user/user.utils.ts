import { User } from './user.model';

const findLastUserId = async () => {
  const lastUser = await User.findOne({ role: 'user' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();

  return lastUser?.id ? lastUser.id.substring(2) : undefined;
};

export const generateUserId = async () => {
  let currentId = '00000';
  const lastUserId = await findLastUserId();

  if (lastUserId) {
    currentId = lastUserId;
  }

  // Increment the ID by 1 and pad it to ensure it is 5 digits long
  let incrementId = (Number(currentId) + 1).toString().padStart(5, '0');

  incrementId = `U-${incrementId}`;

  return incrementId;
};
