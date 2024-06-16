import express from 'express';
import auth from '../../middlewares/auth';
import { BookingControllers } from './booking.controller';
const router = express.Router();

router.post('/', auth('user'), BookingControllers.createNewBooking);

router.put('/:id/return', auth('admin'), BookingControllers.returnBike);

router.get('/', auth('user'), BookingControllers.getAllRental);


export const BookingRouters = router;
