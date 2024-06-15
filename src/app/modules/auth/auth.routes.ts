import express from 'express';
import { AuthControllers } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidations } from '../user/user.validation';
import { AuthVlidation } from './auth.validation';

const router = express.Router();

router.post('/signup',validateRequest(userValidations.createUserValidationSchema), AuthControllers.createUser);

router.post(
  '/login',
  validateRequest(AuthVlidation.loginValidationSchema),
  AuthControllers.loginUser,
);

export const AuthRouters = router;
