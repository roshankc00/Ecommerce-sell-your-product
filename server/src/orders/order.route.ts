import express from 'express'
import { checkAuth, checkRole } from '../middlewares/authMiddleware';
import { createOrder, deleteOrder, getAllOrder, getSingleOrder, updateOrder } from './order.controller';



const router=express.Router()


router.post('/orders',checkAuth,createOrder)
router.get('/orders/:id',checkAuth,getSingleOrder)
router.put('/orders/:id',checkAuth,updateOrder)
router.delete('/orders/:id',checkAuth,deleteOrder)
router.get('/orders',checkAuth,getAllOrder)



export default router  