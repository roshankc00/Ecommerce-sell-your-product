import mongoose, { Document } from "mongoose";

export interface brandInterface extends Document {
    title: string;
    description: string;
    updatedBy: mongoose.Schema.Types.ObjectId;
    discontinued:boolean
    addedBy: mongoose.Schema.Types.ObjectId;
   
}
