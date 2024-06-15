import express from 'express';
import auth from '../../middlewares/auth';
import { BikeControllers } from './bike.controller';
import validateRequest from '../../middlewares/validateRequest';
import { bikeValidations } from './bike.validation';

const router = express.Router();

router.post('/', auth('admin'),validateRequest(bikeValidations.createBikeValidationSchema), BikeControllers.createBike);

router.put('/:id', auth('admin'),validateRequest(bikeValidations.updateBikeValidationSchema), BikeControllers.updateSingleBike);

router.delete('/:id', auth('admin'), BikeControllers.deleteSingleBike);

router.get('/', BikeControllers.getAllBikes);

export const BikeRouters = router;
