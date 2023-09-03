import Stripe from 'stripe'
import express ,{Request,Response} from 'express'
import env from '../utils/env.validator'
const router=express.Router()
const stripe=new Stripe(env.STRIPE_API_KEY,{
    apiVersion:"2023-08-16",
})
const URL=env.CLIENT_URL
const YOUR_DOMAIN = 'http://localhost:4242';
router.post('/create-checkout-session', async (req:Request, res:Response) => {
  
  const line_items=req.body.cartItems.map((item:any)=>{
    return {
       price_data:{
        currency:'usd',
        product_data:{
          name:item.title,
          metadata:{
            id:item._id
          }

        },
        unit_amount:item.price*100,       
        
      },
      quantity:item?.cartQuantity
    }
   })

    const session = await stripe.checkout.sessions.create({
    line_items,
      mode: 'payment',
      success_url: `${URL}/success`,
    //   cancel_url: `${URL}/cart`,
    });

if(session){
  res.status(200).json({
    status:true,
    data:session.url
})
}
  
  });
  export default router 