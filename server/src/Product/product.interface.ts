import mongoose ,{Document} from "mongoose";
import { Product } from "./product.model";


interface ProductModelInterface extends Document {
    limit(resultperPage: number): unknown;
    find(arg0: { title: { $regex: any; $options: string; }; } | { title?: undefined; }): ProductModelInterface;
    title:string,
    description:string
    price:number,
    discount?:number,
    stock?:number,
    images:[{
        publicId:string,
        url:string
    }]
    category:mongoose.Schema.Types.ObjectId,
    brand:mongoose.Schema.Types.ObjectId,
    store:mongoose.Schema.Types.ObjectId,
    localShipmentPolicy:string,
    customLocalShipmenttPolicy:string,
    weight?:number,
    ratings?:number,
    numOfReviews?:number,
    reviews?:[{
        user:mongoose.Schema.Types.ObjectId,
        rating:number,
        comment:string
    }]
    
    addedBy:mongoose.Schema.Types.ObjectId
    updatedBy?:mongoose.Schema.Types.ObjectId


}

export default ProductModelInterface


export interface CustomResponse extends Response {
    filterData?:Product
  }