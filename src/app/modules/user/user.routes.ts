import express from 'express';
import { UserControllers } from './user.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

router.get('/me', auth('admin', 'user'), UserControllers.getUserProfile);

router.put('/me', auth('admin', 'user'), UserControllers.updateUserProfile);

export const UserRouters = router;
