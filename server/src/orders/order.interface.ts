import mongoose,{ Document } from "mongoose"; 

interface OrderModelInterface extends Document{
    shippingInfo:{
        address:string,
        city:string,
        country:string,
        phone:string
    }

    orderItems:[
        {
            price:number,
            quantity:number,
            product:mongoose.Schema.Types.ObjectId,
        }
    ]

    user:mongoose.Schema.Types.ObjectId,
    paymentInfo:{
        id:string,
        status:string
    }

    paidAt:Date,

    itemPrice?:number

    taxPrice?:number
    
    shippingPrice?:number

    totalPrice:number
    
    orderStatus:string

    deliveredAt:Date

    
}

export default OrderModelInterface