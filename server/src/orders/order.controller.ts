import HandleError from "../utils/errorHandler";
import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import validateMongodbId from "../utils/validateMongoId";
import OrderModel from "./order.model";
import { customRequest } from "../middlewares/authMiddleware";
import ProductModel from "../Product/product.model";
import mongoose from "mongoose";

export const createOrder = asyncHandler(
  async (req: customRequest, res: Response, next: NextFunction) => {
    try {
      const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        totalPrice,
        shippingPrice
      } = req.body;
      console.log(req.body)

      const order=await OrderModel.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        totalPrice,
        shippingPrice,
        user:req.user?._id

      })


      res.status(201).json({
        success:true,
        message:"order created sucessfully",
        order
      })



    } catch (error) {

      console.log(error)
        next(new HandleError("internal server error",400))
    }
}
);




export const getSingleOrder=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const id=req.params.id
        validateMongodbId(id)
        
        console.log("order")
        const order=await OrderModel.findById(id).populate('orderItems.product')
        console.log(order)
        if(!order){
            return next(new HandleError("Order with this id doesnt exists",404))
        }

        res.status(200).json({
            success:true,
            order
        })
        
    } catch (error) {
      console.log(error)
        next(new HandleError("internal server error",400))        
    }
})

export const getAllOrder=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
    try {
      
        const orders=await OrderModel.find().populate('orderItems.product','images title')

        res.status(200).json({
            success:true,
            orders
        })
        
    } catch (error) {
        next(new HandleError("internal server error",400))        
    }
})



export const deleteOrder=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
  try {
      const id=req.params.id
      validateMongodbId(id)

      const order=await OrderModel.findById(id)
      if(!order){
          return next(new HandleError("Order with this id doesnt exists",404))
      }

     const delOrder=await OrderModel.findByIdAndDelete(id)

      res.status(200).json({
          success:true,
          message:"order deleted sucessfully"
      })
      
  } catch (error) {
      next(new HandleError("internal server error",400))        
  }
})




export const updateOrder=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
  try {
      const id=req.params.id
      validateMongodbId(id)

      const order=await OrderModel.findById(id)
      if(!order){
          return next(new HandleError("Order with this id doesnt exists",404))
      }
      if(order.orderStatus==='Delivered') return next(new HandleError('You have already deliverd this item',400));
      if(order.orderStatus==='Proccessing' && req.body.status==='Delivered') return next(new HandleError('Not possible to deliver before shipping.',400));


      if(req.body.status==='Shipped'){
        order.orderItems.forEach(async (o)=>{
            await updateStock(o.product,o.quantity);
        })
    }

    order.orderStatus=req.body.status;
    if(req.body.status==='Delivered'){
      order!.deliveredAt=new Date(Date.now())
  }

      res.status(200).json({
          success:true,
          order
      })
      await order.save()
      
  } catch (error) {
      next(new HandleError("internal server error",400))        
  }
})


async function updateStock(id:mongoose.Schema.Types.ObjectId,quantity:number){
  const product=await ProductModel.findById(id);
  product!.stock=quantity;
  product!.stock=product!.stock-quantity
  await product?.save();
}