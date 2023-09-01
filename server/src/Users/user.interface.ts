import mongoose,{Document} from "mongoose";

interface UserModelInterface extends Document{
    name:string,
    email:string,
    password:string,
    
    phone:string
    avatar?:{
        publicId:string,
        url:string
    },
    updatedBy?:mongoose.Schema.Types.ObjectId,
    roles?:string,
    store?:mongoose.Schema.Types.ObjectId
    refreshToken?:string,
    blocked?:boolean,
    comparePassword(password:string):Promise<boolean>
    
}

export default UserModelInterface




export interface payloadInterface {
    email:string,
    id:string

}