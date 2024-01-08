import Bookings from '../models/Bookings.js';
import User from "../models/User.js";
import bcrypt from 'bcryptjs';

export const getAllUsers = async(req,res,next)=>{
  let users;
    try {
      users =await User.find();
    } catch (error) {
      return console.log(error)
    }
    if(!users){
      return res.status(500).json({message: "Unexpected Error Occured"})
    }

    return res.status(200).json({users})
}

export const addNewUser = async (req,res,next)=>{
  const {name, email, password } = req.body;
    if(!name && name.trim() === "" 
    && !email && email.trim() === "" 
    && !password && password.trim() === ""){
      return res.status(422).json({message: "Invalid Inputs"})
    }
   const hashPwd = bcrypt.hashSync(password) 
    let user;
    try {
      
      user = new User({name, email , password:hashPwd})
      user =await user.save()

    } catch (error) {
      return console.log(error)
    }
    if(!user){
      return res.status(500).json({message: "Unexpected Error Occured"})
    }
    return res.status(201).json({ id: user._id })
  
}

export const updateUser = async(req, res, next)=>{
  
  const id = req.params.id

  const {name, email, password } = req.body

    if(!name && name.trim() === "" 
    && !email && email.trim() === "" 
    && !password && password.trim() === ""){
      return res.status(422).json({message: "Invalid Inputs"})
    }  
    const hashPwd = bcrypt.hashSync(password);
    let user;
    try {

      user = await User.findByIdAndUpdate(id,{name , email, password:hashPwd}) 
      
    } catch (error) {
      return console.log(error)
    }
    if(!user){
      return res.status(500).json({message: "Somthing went wrong"})
    }
    res.status(200).json({message:"User Details Updated!"})

}

export const deleteUser = async(req, res, next)=>{
    const id = req.params.id
    let user;
    try {
      user = await User.findByIdAndDelete(id) 
      
    } catch (error) {
      return console.log(error)
    }
    if(!user){
      return res.status(500).json({message: "Somthing went wrong"})
    }
   return res.status(200).json({message:"User deleted!"})
}

export const login =async(req, res, next)=>{

    const{email , password} = req.body;

    if(email && email.trim()==="" &&  password && password.trim() === ""){
      return res.status(422).json({message:"Invalid Inputs"})
    }
    let exitUser;
    try {
      exitUser = await User.findOne({email})
    } catch (error) {
      return console.log(error)
    }

  if(!exitUser){
    return res.status(404).json({message:"Unable to user from this id"})
  }

  let isCrtPwd = bcrypt.compareSync(password,exitUser.password)

  if(!isCrtPwd){
    return res.status(404).json({message:"Incorrect password"})
  }
  
  return res.status(200).json({message: "Login successfully!", id:exitUser._id})
  

}

export const getBookingsOfUser = async(req, res, next)=>{

const id = req.params.id;
let bookings;
try {

  bookings = await Bookings.find({user: id})
  //console.log(bookingsOfUser)
  
} catch (error) {
  return console.log(error)
}
if(!bookings){
  return res.status(500).json({message:"Unable to get bookings"});

}
return res.status(200).json({ bookings })


}

export const getUserById = async(req,res,next)=>{
  const id = req.params.id
  let user;
    try {
      user =await User.findById(id);
    } catch (error) {
      return console.log(error)
    }
    if(!user){
      return res.status(500).json({message: "Unexpected Error Occured"})
    }

    return res.status(200).json({ user })
}