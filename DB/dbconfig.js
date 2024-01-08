import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const URL = process.env.MONGODB_URL

async function conntectDb(){
   try {
     const connection = await mongoose.connect(URL)
      console.log('DB connected!')
    return connection;
      
   } catch (error) {
      console.log(error,"Error in connect DB")
   }

}

export default conntectDb