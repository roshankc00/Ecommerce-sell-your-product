import mongoose from "mongoose";
const validateMongodbId=(id:string)=>{
    const isvalid:boolean=mongoose.Types.ObjectId.isValid(id);
    if(!isvalid){
        throw new  Error ("this Id is not Valid or found")
    }
}

export default validateMongodbId