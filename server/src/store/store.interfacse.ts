import mongoose ,{Document} from "mongoose";


interface StoreModelInterface extends Document {
    title:string,
    email:string,
    description:string

    location:{
        address:string,
        city:string,
        zipcode:number
        state:number,
        country:number

    }

    logo:{
        publicId:string,
        url:string
    }
   
    
    addedBy:mongoose.Schema.Types.ObjectId
    updatedBy:mongoose.Schema.Types.ObjectId


}

export default StoreModelInterface