import HandleError from "../utils/errorHandler";
import asyncHandler from 'express-async-handler'
import { NextFunction ,Request,Response} from 'express';
import validateMongodbId from "../utils/validateMongoId";
import UserModel from "./user.model";
import { createToken } from "../utils/generateToken";
import { payloadInterface } from "./user.interface";
import bcrypt from 'bcrypt';



export const signUpUser=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
    const {email,name,password,phone}=req.body
    let user=await UserModel.findOne({email})
    if(user){
        return next(new HandleError("the user alreasy exist",404))
    }

   const newUser=await  UserModel.create({
        email,
        name,
        password,
        phone
    })
    res.status(201).json({
        sucess:true,
        newUser
    })
})



export const loginUser=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
    const {email,password}=req.body

    let existuser=await UserModel.findOne({email}).select('+password')
    if(!existuser){
       return  next(new HandleError("the user dosn't exist",404))
    }

    const hashpass:any=existuser!.password
    console.log(hashpass)

    
 const isTrue=await bcrypt.compare(password,hashpass)
 console.log(isTrue)

    if(!isTrue){
        return   next(new HandleError("enter the valid password",400))
        
    }
    const payload:payloadInterface={
        email,
        id:String(existuser!._id)
    }
    const token=createToken(payload)
    res.cookie('token',token);
     res.status(200).json({
        sucess:true,
        message:"user login sucessfully",
    })
    



})