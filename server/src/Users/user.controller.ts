import HandleError from "../utils/errorHandler";
import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import validateMongodbId from "../utils/validateMongoId";
import UserModel from "./user.model";
import { createToken, generateRefreshToken } from '../utils/generateToken';
import bcrypt from "bcrypt";
import env from '../utils/env.validator'
import jwt from "jsonwebtoken";
import UserModelInterface from "./user.interface";

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
      success: true,
      newUser,
    });
  }
);

export const loginUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const cookies = req.cookies;

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

    let newRefreshTokenArray: any = !cookies.jwt
      ? existuser.refreshToken
      : existuser?.refreshToken?.filter((rt) => rt !== cookies.jwt);

    if (cookies?.jwt) {
      const refreshToken = cookies.jwt;
      const foundToken = await UserModel.findOne({ refreshToken }).exec();
      if (!foundToken) {
        console.log("attempted token  refuse at login ");
        newRefreshTokenArray = [];
      }
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
    }
    existuser.refreshToken = [...newRefreshTokenArray, newrefreshtoken];

    await existuser.save();
    console.log(existuser);

    const sendUser = await UserModel.findOne({ email }).select(
      "name, createdAt  roles"
    );
    res.cookie("jwt", newrefreshtoken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      success: true,
      acesstoken,
      user: sendUser,
    });
  }
);

export const logout = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
      res.status(200).json({
        success: true,
        message: "user logout successfully",
      });
      return;
    }

    const refreshToken = cookies.jwt;
    const user = await UserModel.findOne({ refreshToken }).exec();
    if (!user) {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res.status(200).json({
        success: true,
        message: "user logout successfully",
      });
      return;
    }

    user!.refreshToken = user?.refreshToken?.filter(
      (rt) => rt !== refreshToken
    );
    await user?.save();
    res
      .clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true })
      .status(200)
      .json({
        success: true,
        message: "user logout successfully",
      });
  }
);

export const getAllUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await UserModel.find();
    res.status(200).json({
      success: true,
      users,
    });
  }
);

export const getASingleUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    validateMongodbId(id);
    const user = await UserModel.findById(id);
    if (!user) {
      return next(new HandleError("User not found", 404));
    }

    res.status(200).json({
      success: true,
      user,
    });
  }
);

export const uodateUserRole = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.body.id;
    const role = req.body.role;
    validateMongodbId(id);
    const user = await UserModel.findById(id);
    if (!user) {
      return next(new HandleError("User not found", 404));
    }
    if (!user.roles?.includes(role)) {
      user.roles?.push(role);
    }
    console.log(user);

    await user.save();
    res.status(200).json({
      success: true,
      message: "User role has been updated sucessfully",
      user,
    });
  }
);





export const RefreshToken=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
  try {
    const cookies=req.cookies;
    if(!cookies?.jwt){
      return next(new HandleError("invalid creadentials",401))
    }

    const refreshToken=cookies.jwt;
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true })

    const user=await UserModel.findOne({refreshToken});
    if(!user){
      jwt.verify(refreshToken,env.REFRESH_TOKEN_SECRET,async(err:any,decorded:any)=>{
        if(err){
          return next(new HandleError("Forbidan",403))
        }
        const hackedUser=await UserModel.findOne({_id:decorded.userId}).exec()
        hackedUser!.refreshToken=[]
        await hackedUser?.save()
        
      })
      return next(new HandleError("Forbidden",403))
    }


    const newrefreshTokenArray=user.refreshToken?.filter((rt)=>rt!=refreshToken)

    jwt.verify(refreshToken,env.REFRESH_TOKEN_SECRET,async(err:any,decorded:any)=>{
      if(err){
        user.refreshToken=[...newrefreshTokenArray!]
        await user.save();
        return next(new HandleError('Unauthorized',401))
        
      }

      if(err || user._id.toString()!==decorded.userId){
        return next(new HandleError("Forbidden",403))
      }

      const accessToken=createToken(user)
      const newRefreshToken=generateRefreshToken(user);
      user!.refreshToken=[...newrefreshTokenArray!,newRefreshToken]
      await user.save();
      res.cookie("jwt", newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      });


      res.status(200).json({success:true,accessToken});

    
    })


    
  } catch (error) {
    
  }

})