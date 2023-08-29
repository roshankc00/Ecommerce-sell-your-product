import mongoose ,{Document} from "mongoose";


interface ProductModelInterface extends Document {
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
        user:mongoose.Schema.Types.ObjectId
    }]
    
    addedBy:mongoose.Schema.Types.ObjectId
    updatedBy?:mongoose.Schema.Types.ObjectId


}

export default ProductModelInterface