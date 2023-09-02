import HandleError from "../utils/errorHandler";
import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import validateMongodbId from "../utils/validateMongoId";
import BrandModel from "./brand.model";
import { customRequest } from "../middlewares/authMiddleware";
import ProductModel from "../Product/product.model";

export const createBrand = asyncHandler(
  async (req: customRequest, res: Response, next: NextFunction) => {
    req.body.addedBy=req?.user?._id;
    const brand = await BrandModel.create(req.body);
    res.status(201).json({
      sucess: true,
      message: "Brand added sucessfully",
      brand,
    });
  }
);




export const getAllBrands = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const brands = await BrandModel.find();
    res.status(200).json({
      sucess: true,
      brands,
    });
  }
);





export const getASingleBrand = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    validateMongodbId(id);
    const brand = await BrandModel.findById(id);
    console.log(brand)
    if (!brand) {
      next(new HandleError("Brand not found", 404));
    }
    res.status(200).json({
      sucess: true,
      brand,
    });
  }
);






export const updateBrand = asyncHandler(
  async (req: customRequest, res: Response, next: NextFunction) => {
    const id = req.params.id;
    validateMongodbId(id);
    req.body.updatedBy=req.user?._id
    const brand = await BrandModel.findById(id);
    if (!brand) {
      next(new HandleError("Brand not found", 404));
    }

    const updBrand = await BrandModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json({
      sucess: true,
      messgae: "Brand has been sucessfully updated",
    });
  }
);







export const deleteBrand = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
      const id = req.params.id;
      validateMongodbId(id);
    const brand = await BrandModel.findById(id);
    if (!brand) {
        next(new HandleError("Brand not found", 404));
    }


    const active=await ProductModel.findOne({brand:req.params.id})
    if(active){
        next(new HandleError("Brand  is used and it cant be deleted", 406));
    }

    const updBrand = await BrandModel.findByIdAndDelete(id);
    res.status(200).json({
      sucess: true,
      messgae: "Brand has been deleted sucessfullt",
    });
  }
);
