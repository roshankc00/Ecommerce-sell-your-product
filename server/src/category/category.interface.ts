import mongoose, { Document } from "mongoose";

export interface categoryInterface extends Document {
    title: string;
    description: string;
    updatedBy?: mongoose.Schema.Types.ObjectId;
    discontinues?:boolean
    addedBy: mongoose.Schema.Types.ObjectId;
   
}
