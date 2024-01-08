import express  from "express";
import { getAllUsers,addNewUser,updateUser,deleteUser, login, getBookingsOfUser, getUserById } from "../controllers/user-controller.js";

const userRouter = express.Router()

userRouter.get('/',getAllUsers);
userRouter.get('/:id',getUserById);
userRouter.post('/signup',addNewUser);
userRouter.put('/:id',updateUser)
userRouter.delete("/del/:id",deleteUser);
userRouter.post('/login', login);
userRouter.get("/bookings/:id",getBookingsOfUser)
  
export default userRouter;