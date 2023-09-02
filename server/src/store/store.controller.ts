import HandleError from "../utils/errorHandler";
import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import validateMongodbId from "../utils/validateMongoId";
import { customRequest } from "../middlewares/authMiddleware";
import ProductModel from "../Product/product.model";
import StoreModel from "./store.model";
import cloudinary from "../config/cloudinary.config";
import StoreModelInterface from "./store.interfacse";
import fs from "fs";

export const addStore = asyncHandler(
  async (req: customRequest, res: Response, next: NextFunction) => {
    try{
    const {
      title,
      description,
      email,
      address,
      city,
      zipcode,
      state,
      country,
    } = req.body;
    let cloud;

    try {
      cloud = await cloudinary.v2.uploader.upload(req.file!.path);
    } catch (error) {
      res.status(400).json({
        sucess: false,
        message: "unable to upload to cloudinary",
      });
    }

    const addedBy = req.user?._id;

    const location = {
      address,
      city,
      zipcode,
      state,
      country,
    };

    const store = await StoreModel.create({
      title,
      description,
      location,
      email,
      addedBy,
      logo: {
        url: cloud?.secure_url,
        publicId: cloud?.public_id,
      },
    });

    res.status(201).json({
      sucess: true,
      message: "store added sucessfully",
      store,
    });


    fs.unlinkSync(req.file!.path)

} catch (error) {
    res.status(400).json({
        sucess:false,
        messgage:'internal server error'
    })
    
}
  }
);

export const getsingleStore = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    validateMongodbId(id);
    const store = await StoreModel.findById(id);
    if (!store) {
      return next(new HandleError("Store with this id doesnt exists", 404));
    }
    res.status(200).json({
      sucess: true,
      store,
    });
  }
);

export const getAllStore = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try{
    const stores = await StoreModel.find();

    res.status(200).json({
      success: true,
      stores,
    });
} catch (error) {
    res.status(400).json({
        sucess:false,
        messgage:'internal server error'
    })
    
}


  }
);

export const updateStore = asyncHandler(
  async (req: customRequest, res: Response, next: NextFunction) => {

try{








    const {
      address,
      city,
      zipcode,
      state,
      isLogoEdited,
      country,
    } = req.body;
    req.body.addedBy=req.user?._id;
   
    const id = req.params.id;

    validateMongodbId(id);
    const store = await StoreModel.findById(id);

    if (!store) {
      return next(new HandleError("Store with this id doesnt exists", 404));
    }

    if (
      !req.user?.roles?.includes("admin") ||
      req.user?._id.toString() != store?.addedBy.toString()
    ) {
      return next(
        new HandleError("you are not authorized to update the resource", 401)
      );
    }
    const publidId: string | undefined = store.logo?.publicId;

    req.body.location = {
      city,
      zipcode,
      state,
      country,
      address,
    };
    delete req.body["city"];
    delete req.body["address"];
    delete req.body["zipcode"];
    delete req.body["country"];
    delete req.body["state"];
    delete req.body["isLogoEdited"];

    if (isLogoEdited) {
      if (publidId) {
        const destroy = await cloudinary.v2.uploader.destroy(publidId);
      }
      const cloud = await cloudinary.v2.uploader.upload(req.file!.path);
      req.body.logo = {
        url: cloud.secure_url,
        publicId: cloud.public_id,
      };
      const updStore = await StoreModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      res.status(200).json({
        success: true,
        message: "store updated sucessfully",
        updStore,
      });

      return;
    } else {
      console.log(req.body);
      const updStore = await StoreModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      res.status(200).json({
        success: true,
        message: "store updated sucessfully",
        updStore,
      });
    }



} catch (error) {
    res.status(400).json({
        sucess:false,
        messgage:'internal server error'
    })
    
}





  }
);




export const deleteStore = asyncHandler(
  async (req: customRequest, res: Response, next: NextFunction) => {

    try {




        
   
    const id = req.params.id;
    validateMongodbId(id);

    const store = await StoreModel.findById(id);
    if (
      !req.user?.roles?.includes("admin") ||
      req.user?._id != store?.addedBy
    ) {
      return next(
        new HandleError("you are not authorized to delete the resource", 401)
      );
    }
    if (!store) {
      return next(new HandleError("Store with this id doesnt exists", 404));
    }
    const isActive=await ProductModel.findOne({store:id})
    if(isActive){
        next(new HandleError('This store is used in product. Hence Could not deleted',404));

    }

    const publidId: string | undefined = store.logo?.publicId;

    if (publidId) {
      const destroy = await cloudinary.v2.uploader.destroy(publidId);
    }

    const delStore = await StoreModel.findByIdAndDelete(id);

    res.status(200).json({
      sucess: true,
      message: "store deleted sucessfully",
    });
  }

catch (error) {
    res.status(400).json({
        sucess:false,
        messgage:'internal server error'
    })
    
}
});
