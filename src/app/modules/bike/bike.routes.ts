import express from 'express';
import auth from '../../middlewares/auth';
import { BikeControllers } from './bike.controller';
import validateRequest from '../../middlewares/validateRequest';
import { bikeValidations } from './bike.validation';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(bikeValidations.createBikeValidationSchema),
  BikeControllers.createBike,
);

router.put(
  '/:id',
  auth(USER_ROLE.superAdmin,USER_ROLE.admin),
  validateRequest(bikeValidations.updateBikeValidationSchema),
  BikeControllers.updateSingleBike,
);
 
router.delete('/:id', auth(USER_ROLE.superAdmin,USER_ROLE.admin), BikeControllers.deleteSingleBike);

router.get('/available-bikes', BikeControllers.getAvailableBikes);
router.get('/:id', BikeControllers.getSingleBikes);

router.get('/', BikeControllers.getAllBikes);

export const BikeRouters = router;
