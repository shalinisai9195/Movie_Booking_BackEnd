import express from 'express';
import dbconnect from './DB/dbconfig.js';
import userRouter from './routes/user-routes.js';
import adminRouter from './routes/admin-routes.js';
import movieRouter from './routes/movie-routes.js';
import bookingRouter from './routes/booking-routes.js';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
dbconnect();

app.use(express.json())
app.use(cors())
app.use("/user",userRouter);
app.use("/admin", adminRouter);
app.use('/movie',movieRouter);
app.use('/booking', bookingRouter);

const port = process.env.PORT || 5050

  app.listen(port,()=>{
    console.log(`App listening ${port} DB conntected`)
  })




