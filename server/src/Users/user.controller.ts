import HandleError from "../utils/errorHandler";
import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import validateMongodbId from "../utils/validateMongoId";
import UserModel from "./user.model";
import { createToken, generateRefreshToken } from "../utils/generateToken";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

export const signUpUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, name, password, phone } = req.body;
    let user = await UserModel.findOne({ email });
    if (user) {
      return next(new HandleError("the user alreasy exist", 404));
    }

    const newUser = await UserModel.create({
      email,
      name,
      password,
      phone,
    });
    res.status(201).json({
      sucess: true,
      newUser,
    });
  }
);

export const loginUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    
    const { email, password } = req.body;
    const cookies=req.cookies;

    let existuser = await UserModel.findOne({ email }).select("+password");
    if (!existuser) {
      return next(new HandleError("the user dosn't exist", 404));
    }

    const hashpass: any = existuser!.password;
    console.log(hashpass);

    const isTrue = await bcrypt.compare(password, hashpass);

    if (!isTrue) {
      return next(new HandleError("enter the valid password", 400));
    }

    const acesstoken = createToken(existuser);

    const newrefreshtoken = generateRefreshToken(existuser);


    let  newRefreshTokenArray:any=!cookies.jwt?existuser.refreshToken:existuser?.refreshToken?.filter(rt=>rt!==cookies.jwt);



    if(cookies?.jwt){
        const refreshToken=cookies.jwt;
        const foundToken=await UserModel.findOne({refreshToken}).exec();
        if(!foundToken){
            console.log("attempted token  refuse at login ")
            newRefreshTokenArray=[]
        }
        res.clearCookie('jwt',{httpOnly:true,sameSite:'none',secure:true})
    }
    existuser.refreshToken=[...newRefreshTokenArray,newrefreshtoken]

    await existuser.save()
    console.log(existuser)


    const sendUser = await UserModel.findOne({ email }).select(
      "name, createdAt avatar roles"
    );
    res
      .cookie("jwt", newrefreshtoken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      })
      res.status(200)
      .json({
        sucess: true,
        acesstoken,
        user:sendUser
       
      });

 
  }
);





export const logout =asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
    const cookies=req.cookies;
    if(!cookies?.jwt){
        res.status(200).json({
            sucess:true,
            message:"user logout sucessfully"
        })
        return 

    }


    const  refreshToken=cookies.jwt;
    const user=await UserModel.findOne({refreshToken}).exec();
    if(!user){
        res.clearCookie('jwt',{httpOnly:true,sameSite:'none',secure:true})
        res.status(200).json({
            sucess:true,
            message:"user logout sucessfully"            
        })
        return 
    }
    
    user!.refreshToken=user?.refreshToken?.filter(rt=>rt!==refreshToken);
    await user?.save()
    res.clearCookie('jwt',{httpOnly:true,sameSite:'none',secure:true})
     .status(200).json({
        sucess:true,
        message:"user logout sucessfully"   
     })



})