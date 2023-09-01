import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail";
import UserModelInterface from "./user.interface";
import bcrypt from 'bcrypt'

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
        select:false,
        required:true
      },
      phone:{
        type:String,
        required:true
    },
   

    avatar:{
        publicId:String,
        url:String
    },
    roles:{
        type:String,
        enum:['admin','user','seller'],
        default:'user',
    },
    updatedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },

      store:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
      },

      refreshToken:{
        type:String,
      },
      blocked:{
        type:Boolean,
        default:false
      }
   


},{timestamps:true})



userSchema.pre(
  "save",
  async function(next){
      if(this.isModified('password')){
          this.password=await bcrypt.hash(this.password,10)
          return 
      }
      next()
  }
)






const UserModel=mongoose.model<UserModelInterface>('User',userSchema)
export default UserModel    

