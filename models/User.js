import mongoose from "mongoose";

const  userSchema = new mongoose.Schema({
   name:{
    type:String,
    require:true
   },
   email:{
    type:String,
    require:true,
    unique:true
   },
   password:{
    type:String,
    require:true,
    minLength:6,
   },
   bookings:[{type:mongoose.Types.ObjectId, ref:"Booking"}]
})

export default mongoose.model('User',userSchema)