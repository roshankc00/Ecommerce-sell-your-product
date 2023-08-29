import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail";
import UserModelInterface from "./user.interface";

const userSchema=new mongoose.Schema<UserModelInterface>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        validate:[isEmail,""],
        unique:true
    },
    password:{
        type:String,
        minLength:[6,],
        select:false
    },
    phone:{
        type:Number
    },
   

    avatar:{
        publicId:String,
        utl:String
    },
    roles:{
        type:String,
        enum:['admin','user','seller'],
        default:'user',
    },
    updatedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true],
      },

      store:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
      },

      refreshToken:{
        type:String,
      },
      blocked:{
        type:Boolean,
        default:false
      }





    


},{timestamps:true})

const UserModel=mongoose.model<UserModelInterface>('User',userSchema)
export default UserModel    

