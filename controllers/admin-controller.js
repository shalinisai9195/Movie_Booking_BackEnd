import Admin from "../models/Admin.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const addAdmin = async(req, res, next)=>{
   const {email, password} = req.body;

   if(email && email.trim()==="" &&  password && password.trim() === ""){
    return res.status(422).json({message:"Invalid Inputs"})
  }

  let existAdmin;
  try {
    existAdmin = await Admin.findOne({email})
    
  } catch (error) {
    return console.log(error)
  }
  if(existAdmin){
    return res.status(400).json({message:"Admin already exists"})
  }
  const hashPwd = bcrypt.hashSync(password);
  let admin;

  try {
    admin = new Admin({email, password:hashPwd})
    admin = await admin.save();
  } catch (error) {
    return console.log(error)
  }

  if(!admin){
    return res.status(500).json({message:"unable to store admin"})
  }
  
  return res.status(201).json({message:"Admin created!",admin})

}

export const adminLogin = async(req, res, next)=>{
    const {email, password} = req.body;

    if(email && email.trim()==="" &&  password && password.trim() === ""){
      return res.status(422).json({message:"Invalid Inputs"})
    }
   
    let existAdmin;
    try {

      existAdmin = await Admin.findOne({email})
      
    } catch (error) {
      return console.log(error)
    }
    if(!existAdmin){
      return res.status(404).json("Admin not found")
    }
    let isPwdCrt = bcrypt.compareSync(password, existAdmin.password)

    if(!isPwdCrt){
      return res.status(404).json({message:"Password incorrect"})
    }

  const token = jwt.sign({ id: existAdmin._id}, process.env.SECRET_KEY,{ expiresIn:"100d"})

    res.status(200).json({message:"Authentication Complete!!",token, id: existAdmin._id})

}

export const getAdmins = async(req, res, next)=>{
   let admin;
   try {

    admin = await Admin.find();
    
   } catch (error) {
      return console.log(error)
   }
   if(!admin){
    return res.status(500).json({message:"Internal Server error"})
   }
   return res.status(200).json({admin})
}

export const getAdminById = async(req, res, next)=>{
   let id = req.params.id;

   let admin;
   try {
    admin = await Admin.findById(id).populate("addedmovies");
    
   } catch (error) {
      return console.log(err)
   }
   if(!admin){
    return console.log("cannot find admin");
   }

   return res.status(200).json({admin })
}