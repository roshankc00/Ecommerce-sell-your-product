import mongoose from "mongoose";
import OrderModelInterface from "./order.interface";


const orderSchema=new mongoose.Schema<OrderModelInterface>({

    shippingInfo:{
        address:{
            type:String,
            required:true,            
        },
        city:{
            type:String,
            required:true,            
        },
        country:{
            type:String,
            required:true,            
        },
        phone:{
            type:String,
            required:true,            
        },

                

    },

    orderItems:[{
        price:{
            type:Number,
            required:true
        },
        quantity:{
            type:Number,
            required:true
        },
        product:{
            type:mongoose.Schema.ObjectId,
            ref:"Product",
            required:true,
        }
        
    }],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
    paymentInfo:{
        id:{
            type:String,
            required:true,

        },
        status:{
            type:String,
            required:true
        },
    },
    paidAt:{
        type:Date,
        default:Date.now,
    },
    itemPrice:{
        type:Number,
        default:0,
        required:true
    },
    taxPrice:{
        type:Number,
        default:0,
        required:true
    },
    shippingPrice:{
        type:Number,
        required:true,
        default:0
    },
    totalPrice:{
        type:Number,
        required:true,
        default:0
    },
    orderStatus:{
        type:String,
        enum:['Processing','Shipped','Delivered'],
        default:'Processing'
    },
    deliveredAt:{
        type:Date,
    }  


},{timestamps:true})


const OrderModel=mongoose.model<OrderModelInterface>('Order',orderSchema)

export default OrderModel

