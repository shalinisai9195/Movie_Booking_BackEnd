import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title:{
    type:String,
    require:true
  },
  description:{
    type:String,
    require:true
  },
  actors:[{
    type:String,
    required:true
  }],
  releaseDate:{
    type: Date,
    require:true
  },
  posterUrl:{
    type:String,
    require:true
  },
  featured:{
    type: Boolean
  },
  bookings:[{
    type: mongoose.Types.ObjectId,
    ref:"Booking"
  }],
  admin:{
    type:mongoose.Types.ObjectId,
    ref:"Admin",
    require:true
  }

})

export default mongoose.model('Movie',movieSchema);