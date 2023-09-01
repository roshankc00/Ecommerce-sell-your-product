import ErrorHandler from '../utils/errorHandler';
import { Request,Response,NextFunction } from 'express';


export const notFound=async(req:Request,res:Response,next:NextFunction)=>{
    const error=new Error(`Route note found ${req.originalUrl}`)
    res.status(404)
    next()
}






const ErrorMiddleware=(err:any,req:Request,res:Response,next:NextFunction)=>{
    err.statusCode=err.statusCode || 500;
    err.message=err.message

    if(err.name==='CastError'){
        const message="Resource not  found. Invalid"+err.path;
        err=new ErrorHandler(message,400)
        


    }
    if(err.code===11000){
        const fieldName=err.message.split("index: ")[1].split("_")[0];
        const message=`Duplicate Value entered in ${fieldName}`
        err=new ErrorHandler(message,409)
                
    }
    res.status(err.statusCode).json({
        success:false,
        message:err.message
    })


   

    next()
    return 

}

export default ErrorMiddleware