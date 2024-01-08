import mongoose from "mongoose";
import Bookings from "../models/Bookings.js";
import Movie from '../models/Movie.js';
import User from "../models/User.js";


export const newBookings = async(req, res, next)=>{
  
  const {movie, date, seatNumber, user} = req.body;

  // if(!movie && movie.trim() === "" &&
  //  !date && date.trim() === "" &&
  //  !seatNumber && seatNumber === "" &&
  //  !user && user === "" ){
  //   return res.status(422).json({message:"Invalid inputs"})
  //  }

  let existingMovies;
  let existingUser;

  try {
    existingMovies = await Movie.findById(movie);
    existingUser = await User.findById(user);
    
  } catch (error) {
    return console.log(error)
  }

  if(!existingMovies){
    return res.status(404).json({message: "Movie Not Found with given ID"})
  }
  if(!user){
    return res.status(404).json({message: "User Not Found with given ID"})
  }

   let booking;
   try {
    
    booking = new Bookings({movie, date:new Date(`${date}`), seatNumber, user})

    const session = await mongoose.startSession();
    session.startTransaction();
    existingUser.bookings.push(booking);
    existingMovies.bookings.push(booking);
    await existingUser.save({session});
    await existingMovies.save({session});
    await booking.save({session})
    session.commitTransaction();

   } catch (error) {
    return console.log(error)
   }

   if(!booking){
    return res.status(500).json({message:"Unable to create booking"});
   }

   return res.status(201).json({ booking })

}

export const getBookingById = async (req, res, next)=>{
  let id = req.params.id;
  let booking;
  try {
    booking = await Bookings.findById(id);
    
  } catch (error) {
    return console.log(error)
  }

  if(!booking){
    return res.status(500).json("Unexpected Error");
  }
  return res.status(200).json({booking});
}

export const deleteBooking = async (req, res, next)=>{
  let id = req.params.id
  let booking;
  try {

    booking = await Bookings.findByIdAndDelete(id).populate("user movie")
    //console.log(booking);

    const session = await mongoose.startSession();
    session.startTransaction();
    //const newData =[]
   // const dum = await booking.user.bookings.filter((ele)=> ele.equals(booking._id) );
    //const dum1 = await booking.movie.bookings.filter((ele)=> ele.equals(booking._id) );
   // console.log(dum)
    //console.log(dum1)
  //  newData.push(dum)
    //booking.user.bookings = newData;
//await User.findById()
     await booking.user.bookings.pull(booking);
     await booking.movie.bookings.pull(booking);
    await booking.user.save({session});
    await booking.movie.save({ session })

    session.commitTransaction();
    
  } catch (error) {
    return console.log(error)
  }
  if(!booking){
    return res.status(500).json({message:"Given Id not delated"})
  }

  return res.status(200).json({message:"Booking deleted successfully!"})
}