import HandleError from "../utils/errorHandler";
import asyncHandler from "express-async-handler";
import env from '../utils/env.validator'
import { NextFunction,Response,Request } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken'
import UserModel from "../Users/user.model";
import UserModelInterface from "../Users/user.interface";





export interface customRequest extends Request {
    user?:UserModelInterface  | null
    
}





export const checkAuth=asyncHandler(async(req:customRequest,res:Response,next:NextFunction)=>{
    try {
        if(!req.headers.authorization){
            throw new HandleError("no token is attach to header",401)
        }
        let checktoken=req.headers.authorization.startsWith('Bearer')
        if(!checktoken){
            throw new Error("register first")
        }
        let token=req.headers.authorization.split(' ')[1]
        jwt.verify(token,env.SECRET,async(err,decorded:any)=>{
            if(err){
                res.status(401).json({
                    sucess:false,
                    message:"invalid credentials"
                })
                return 
            }
            const email=decorded?.UserInfo?.email
            const user:UserModelInterface | null =await UserModel.findOne({email})
            req.user=user
            if(req.user){
                next()   
            }else{

            }
           
        })
    } catch (error:any) {
        throw new Error(error)        
    }

    

})

// check role 
export const checkRole=(roles:string)=>(req:customRequest,res:Response,next:NextFunction)=>{
console.log(req.user?.roles?.includes(roles))


    
    if(req.user?.roles?.includes(roles)){
        next()
    }else{
        res.status(400).json({
            sucess:false,
            message:"you are not authorized to acess this resource"
        
    })

    }
}
