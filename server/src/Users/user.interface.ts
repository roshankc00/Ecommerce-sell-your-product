import mongoose,{Document} from "mongoose";

interface UserModelInterface extends Document{
    name:string,
    email:string,
    password:string,
    
    phone:number
    avatar:{
        publicId:string,
        url:string
    },
    roles:string,
    updatedBy?:Date
    addedBy:Date
    store:mongoose.Schema.Types.ObjectId
    refreshToken:string,
    blocked?:boolean
}

export default UserModelInterface