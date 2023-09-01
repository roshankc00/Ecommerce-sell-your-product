import mongoose from "mongoose";
import { brandInterface } from "./brand.interface";
import brandConstants from "./brand.constant";

const categorySchema=new mongoose.Schema<brandInterface>({
    title:{
        type:String,
        required:[true,brandConstants.TITLE_REQUIRED_MESSAGE],
        unique:true

    },
    description:{
        type:String,
        required:[true,brandConstants.DESCRIPTION_REQUIRED_MESSAGE],
        
    },
    addedBy:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:[true,brandConstants.ADDEDBY_REQUIRED_MESSAGE]
    },
    discontinued:{
        type:Boolean,
        default:false
    },
    updatedBy:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
    }

},{timestamps:true})


const BrandModel=mongoose.model<brandInterface>('Brand',categorySchema)

export default BrandModel