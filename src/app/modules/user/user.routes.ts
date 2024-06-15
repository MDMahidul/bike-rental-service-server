import express from 'express';
import { UserControllers } from './user.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { userValidations } from './user.validation';

const router = express.Router();

router.get('/me', auth('admin', 'user'), UserControllers.getUserProfile);

router.put('/me', auth('admin', 'user'),validateRequest(userValidations.updateUserValidationSchema), UserControllers.updateUserProfile);

export const UserRouters = router;
