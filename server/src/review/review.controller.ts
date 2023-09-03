import HandleError from "../utils/errorHandler";
import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import validateMongodbId from "../utils/validateMongoId";
import { customRequest } from "../middlewares/authMiddleware";
import ProductModel from '../Product/product.model';

export const createProductReview = asyncHandler(
  async (req: customRequest, res: Response, next: NextFunction) => {

    try {
        
  
        const { rating, comment, productId } = req.body;
        const product = await ProductModel.findById(productId);

    const review = {

      userId: req.user?._id,
      rating: Number(rating),
      comment,
    };

    if(!product){
        next(new HandleError("product not found",404))
    }
    
    const alreadyReviewed = product?.reviews?.find(
        (rev) => rev.userId.toString() === req.user?._id.toString()
        );
        console.log(alreadyReviewed)
        
        if (alreadyReviewed) {
        product?.reviews?.forEach((rev) => {
            if (rev.userId.toString() === req.user?._id.toString()) {
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


 await product!.save()

    res.status(200).json({
        success:true,
        message:'review added sucessfuly',
        product
        
        
    })
  }



  

catch (error) {
    console.log(error)
    res.status(404).json({

        success:true,
        message:'internal server error'
    })

        
}

});




export const getProductReview=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
    const product=await ProductModel.findById(req.body.productId)
    if(!product) return next(new HandleError('Product not found',404));

    res.status(200).json({
        sucess:true,
        reviews:product.reviews
    })



   


})




export const deleteProductReview=asyncHandler(async(req:customRequest,res:Response,next:NextFunction)=>{



    try {
        
  
    const product=await ProductModel.findById(req.body.productId)
    if(!product) return next(new HandleError('Product not found',404));


    let reviewsExist=false;

    product!.reviews!.forEach((rev,index)=>
    {

        if(rev.userId.toString()===req.user?._id.toString()){
            reviewsExist=true;
        }
    }
    )



    
    if(!reviewsExist){
        return next(new HandleError("you are not authorized to delete it",401))
    }else{


        const numOfReviews=Number(product.reviews?.length)-1

        const reviews=product.reviews?.filter((rev)=>rev.userId.toString()!=req.user?._id.toString())
        
         
        
        
        let ratings=0;
        let avg=0;
        if(numOfReviews===0){
           ratings=0
        }else{
            ratings=avg/numOfReviews;
        }
        
    
        await ProductModel.findByIdAndUpdate(req.body.productId,{
            ratings,numOfReviews,reviews
        })
        

        
     
        
        
        
        res.status(200).json({
            sucess:true,
            product,
            message:"review deleted sucessfully"
            
        })




        
    }





} catch (error) {
    res.status(404).json({

        success:true,
        message:'internal server error'
    })

        
}
    


})








