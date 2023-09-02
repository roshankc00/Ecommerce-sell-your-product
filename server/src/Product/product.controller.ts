import HandleError from "../utils/errorHandler";
import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import validateMongodbId from "../utils/validateMongoId";
import ProductModel, { Product } from "./product.model";
import { customRequest } from "../middlewares/authMiddleware";
import cloudinary from "../config/cloudinary.config";
import fs from 'fs';
import ApiFeatures from "../utils/Api.feature";
import OrderModel from "../orders/order.model";



export const createProduct = asyncHandler(
  async (req: customRequest, res: Response, next: NextFunction) => {
    try {
      console.log("thanks");
      const { title, description, price, discount, stock, category, brand } =
        req.body;

      if (req.user?.roles?.includes("seller")) {
        req.body.store = req.user.store;
      } else {
        req.body.store = req.body.store;
      }

      let images = [];
      const name: Express.Multer.File[] | any = req?.files;
      try {
        for (let file of name) {
          if (
            file.mimetype === "image/jpeg" ||
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg"
          ) {
            let result = await cloudinary.v2.uploader.upload(file.path);

            images.push({
              url: result?.secure_url,
              publicId: result?.public_id,
            });

            console.log(images);
          }
        }
      } catch (error) {
        res.status(400).json({
          sucess: false,
          message: "unable to upload to cloudinary",
        });
        return;
      }

      let product = await ProductModel.create({
        title,
        description,
        price,
        discount,
        stock,
        images: images,
        category,
        brand,
        store: req.body.store,
        addedBy: req.user?.id,
      });

      // deleting the local file 
      for (let data of name){
        fs.unlinkSync(data.path)   
    } 
    
      res.status(200).json({
        sucess: true,
        messgae: "Product created sucessfully",
        product: product,
      });
    } catch (error) {
      res.status(400).json({
        sucess: false,
        messgage: "internal server error",
      });
    }
  }
);



export const getASingleProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      validateMongodbId(id);

      const product = await ProductModel.findById(id)
      .populate('store', 'id title')
      .populate('brand','id title')
      .populate('category','id title')
      console.log(product)
   
      if (!product) {
        next(new HandleError("user not found", 404));
      }
      res.status(200).json({
        sucess: true,
        product,
      });
    } catch (error) {
      res.status(400).json({
        sucess: false,
        messgage: "internal server error",
      });
    }
  }
);



export interface CustomResponse extends Response {
  filterData?:Product
}

export const getALLProduct = asyncHandler(
  async (req: Request, res:any , next: NextFunction) => {
    try {

      let Product= res.filterData
      res.status(200).json({
        sucess:true,
        Product
      })


      
    } catch (error) {
      res.status(400).json({
        sucess: false,
        messgage: "internal server error",
      });
    }
  }
);





const deleteProduct=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
  try {
    const product=await ProductModel.findById(req.params.id)
    if(!product){
      next(new HandleError("Product not found",404))



    const active=await ProductModel.findOne({orderitems:{$eleMatch:{product:req.params.id}}})
 


    if(active){
      next(new HandleError("Product is used in order hence it cant be deleted",406))
      return 
    }
  
    }

    for (let item of product!.images){
      await cloudinary.v2.uploader.destroy(item.publicId)
    }

    res.status(200).json({
      sucess:true,
      messgae:"Product deleted sucessfully"
    })


    
  } catch (error) {
    res.status(400).json({
      sucess:false,
      message:"internal server error"
    })
    
  }

})