import mongoose from "mongoose";
import productConstants from "./product.constant";
import ProductModelInterface from "./product.interface";

const productSchema=new mongoose.Schema<ProductModelInterface>({
    title:{
        type:String,
        required:[true,productConstants.REQUIRED_TITLE_MESSAGE],
    },
    description:{
        type:String,
        required:[true,productConstants.REQUIRED_DESCRIPTION_MESSAGE]
    },
    price:{
        type:Number,
        required:[true,productConstants.REQUIRED_PRICE_MESSAGE]
    },
    discount:{
        type:Number,
        default:0        
    },
    stock:{
        type:Number,
        required:true,
        default:1,
    },
    images:[{
        publicId:{
            type:String
        },
        url:{
            type:String
        } 
        

    }],
    category:{
        type:mongoose.Schema.ObjectId,
        ref:"Category",
        required:[true,]
    },
    brand:{
        type:mongoose.Schema.ObjectId,
        ref:"Category",
        required:[true,]
    },
    store:{
        type:mongoose.Schema.ObjectId,
        ref:"Store",
        required:[true,]
    },
    localShipmentPolicy:{
        type:String,
        default:'standard',
        enum:['free','standard','custom']

    },
    customLocalShipmenttPolicy:{
        type:String,
    },
    weight:{
        type:Number,
        default:1
    },
    ratings:{
        type:Number,
        default:0
    },
    numOfReviews:{
        type:Number,
        default:0,
    },
    reviews:[{
        user:{
            type:mongoose.Schema.ObjectId,
            ref:'User',
            required:[true]
        },

    }],

    addedBy:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:[true]

    },
    updatedBy:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        // required:[true]

    }

    

    

},{timestamps:true})



const ProductModel=mongoose.model<ProductModelInterface>('Product',productSchema)

export default ProductModel