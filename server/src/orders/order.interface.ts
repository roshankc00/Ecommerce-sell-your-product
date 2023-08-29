import mongoose,{ Document } from "mongoose"; 

interface OrderModelInterface extends Document{
    shippingInfo:{
        address:string,
        city:string,
        country:string,
        Phone:string
    }

    orderItem:[
        {
            price:number,
            quantity:number,
            product:number,
        }
    ]

    user:mongoose.Schema.Types.ObjectId,
    paymentInfo:{
        id:string,
        status:string
    }

    paidAt:Date,

    itemPrice:number

    taxPrice:number
    
    shippingPrice:number

    totalPrice:number
    
    orderStatus:string

    deliveredAt:Date

    
}

export default OrderModelInterface