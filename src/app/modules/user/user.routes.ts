import express from 'express';
import { UserControllers } from './user.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { userValidations } from './user.validation';

const router = express.Router();

router.post(
  '/user-signup',
  validateRequest(userValidations.createUserValidationSchema),
  UserControllers.createUser,
);

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  UserControllers.getAllUsers,
);

// Specific routes for the current user
router.get(
  '/me',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.user),
  UserControllers.getUserProfile,
);

router.put(
  '/me',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.user),
  validateRequest(userValidations.updateUserValidationSchema),
  UserControllers.updateUserProfile,
);

// General routes for user management
router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  UserControllers.changeUserRole,
);

router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  UserControllers.deleteUser,
);



export const UserRouters = router;
