export const USER_ROLE = {
  user: 'user',
  admin: 'admin',
  superAdmin: 'superAdmin',
} as const;

export const userStatus = ['in-progress', 'blocked'];

export const userSearchableFields = ['email', 'id', 'contactNo', 'name'];