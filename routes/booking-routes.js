import express from 'express';
import {newBookings,getBookingById, deleteBooking} from '../controllers/booking-controller.js'


const bookingRouter = express.Router();

bookingRouter.get("/:id",getBookingById);
bookingRouter.post("/",newBookings);
bookingRouter.delete("/:id", deleteBooking);


export default bookingRouter;