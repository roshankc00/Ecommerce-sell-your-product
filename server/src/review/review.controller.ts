import HandleError from "../utils/errorHandler";
import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import validateMongodbId from "../utils/validateMongoId";
import { customRequest } from "../middlewares/authMiddleware";
import ProductModel from "../Product/product.model";

export const createProductReview = asyncHandler(
  async (req: customRequest, res: Response<{success:boolean,message:string}>, next: NextFunction) => {

    try {
        
  
    const { rating, comment, productId } = req.body;

    const review = {
      user: req.user?._id,
      rating: Number(rating),
      comment,
    };

    const product = await ProductModel.findById(productId);

    const alreadyReviewed = product?.reviews?.find(
      (rev) => rev.user.toString() === productId.toString()
    );

    if (alreadyReviewed) {
      product?.reviews?.forEach((rev) => {
        if (rev.user.toString() === productId.toString()) {
          rev.rating = rating;
          rev.comment = comment;
        }
      });
    } else {
      product?.reviews?.push(review);
      product!.numOfReviews = product?.reviews!.length;
    }
    let avg = 0;
    product?.reviews?.forEach((rev) => {
      avg += rev.rating;
    });

    product!.ratings = avg / product!.reviews!.length;
    await product?.save();


    res.status(200).json({
        success:true,
        message:'review added sucessfuly'
    })
  }



  

catch (error) {
    res.status(404).json({
        success:true,
        message:'internal server error'
    })

        
}

});
