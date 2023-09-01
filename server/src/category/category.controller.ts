import HandleError from "../utils/errorHandler";
import CategoryModel from "./category.model";
import asyncHandler from 'express-async-handler'
import { NextFunction ,Request,Response} from 'express';
import validateMongodbId from "../utils/validateMongoId";


export const addCatgory=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
    const category=await CategoryModel.create(req.body)
    res.status(201).json({
        success:true,
        message:"category added sucessfully",
        category
    })

})





export const getAllCatgerories=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
    const categories=await CategoryModel.find();
    res.status(200).json({
        sucess:true,
        categories
    })
})


export const getSingleCatgerory=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
    const id=req.params.id
    validateMongodbId(id);
    const category=await CategoryModel.findById(id);
    if(!category){
        return next(new HandleError("Category Not found",404))        
    }
    res.status(200).json({
        sucess:true,
        category
    })
})


export const updateCategory=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
    const id=req.params.id
    validateMongodbId(id);
    const category=await CategoryModel.findById(id);
    if(!category){
        return next(new HandleError("Category Not found",404))        
    }
    const updCategory=await CategoryModel.findByIdAndUpdate(id,req.body,{new:true})
    res.status(200).json({
        sucess:true,
        message:"category updated sucessfully",
        updateCategory:updCategory
    })
})





export const deleteCategory=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
    const id=req.params.id
    validateMongodbId(id);
    const category=await CategoryModel.findById(id);
    if(!category){
        return next(new HandleError("Category Not found",404))        
    }
    const delCategory=await CategoryModel.findByIdAndDelete(id)
    res.status(200).json({
        sucess:true,
        message:"category deleted sucessfully"
    })
})