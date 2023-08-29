import mongoose from "mongoose";
import categoryConstants from "./category.contant";
import { categoryInterface } from "./category.interface";

const categorySchema=new mongoose.Schema<categoryInterface>({
    title:{
        type:String,
        required:[true,categoryConstants.TITLE_REQUIRED_MESSAGE],

    },
    description:{
        type:String,
        required:[true,categoryConstants.DESCRIPTION_REQUIRED_MESSAGE],
        
    },
    addedBy:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:[true,categoryConstants.ADDEDBY_REQUIRED_MESSAGE]
    },
    discontinues:{
        type:Boolean,
        default:false
    },
    updatedBy:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
    }

},{timestamps:true})


const UserModel=mongoose.model<categoryInterface>('Category',categorySchema)

export default UserModel