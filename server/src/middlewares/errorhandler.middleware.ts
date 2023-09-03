
import {Request,Response,NextFunction} from 'express'
export const notFound=async(req:Request,res:Response,next:NextFunction)=>{
    const error=new Error(`Route note found ${req.originalUrl}`)
    res.status(404)
    next()
}



export const errorHandler=async(error:Error,req:Request,res:Response,next:NextFunction)=>{
    const statusCode=res.statusCode || 500;
    res.status(statusCode).json({
        sucess:false,
        message:error?.message,
                 
    })
}