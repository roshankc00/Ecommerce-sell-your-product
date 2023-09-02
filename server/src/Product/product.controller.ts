import HandleError from "../utils/errorHandler";
import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import validateMongodbId from "../utils/validateMongoId";
import ProductModel from "./product.model";
import { customRequest } from "../middlewares/authMiddleware";
import cloudinary from "../config/cloudinary.config";


export const createProduct=asyncHandler(async(req:customRequest,res:Response,next:NextFunction)=>{
    try {
        console.log("thanks")
        const {title,description,price,discount,stock,category,brand}=req.body



       if(req.user?.roles?.includes('seller')){
        req.body.store=req.user.store
       }else{
        req.body.store=req.body.store
       }



       

       let images=[];
       try {

        const name:Express.Multer.File[] | any =req?.files
        for (let file of name){
          
          if (file.mimetype === "image/jpeg"
          || file.mimetype==='image/png'
        || file.mimetype==='image/jpg'        
        ) {
         let  result = await cloudinary.v2.uploader.upload(file.path);

          images.push({
            url:result?.secure_url,
            publicId:result?.public_id
        })

        console.log(images)
        }           
          }

       
       } catch (error) {
         res.status(400).json({
           sucess: false,
           message: "unable to upload to cloudinary",
         });
         return 
       }



       console.log("perfect")



       let product=await ProductModel.create({
        title,
        description,
        price,
        discount,
        stock,
        images:images,
        category,
        brand,
        store:req.body.store,
        addedBy:req.user?.id


       })

       res.status(200).json({
        sucess:true,
        messgae:"Product created sucessfully",
        product:product
       })









        
    } catch (error) {
        res.status(400).json({
            sucess:false,
            messgage:'internal server error'
        })
        
    }
})

export const getASingleProduct=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
    try {

        const id=req.params.id
        validateMongodbId(id)

        const product=await ProductModel.findById(id)
        if(!product){
            next(new HandleError("user not found",404))
        }
        res.status(200).json({
            sucess:true,
            product
        })






        
    } catch (error) {
        res.status(400).json({
            sucess:false,
            messgage:'internal server error'
        })
        
    }
})

export const getALLProduct=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const Products=await ProductModel.find()
        res.status(200).json({
            sucess:true,
            Products
        })        
    } catch (error) {
        res.status(400).json({
            sucess:false,
            messgage:'internal server error'
        })
        
    }
})



