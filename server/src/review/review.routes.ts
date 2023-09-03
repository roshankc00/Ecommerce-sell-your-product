import express from 'express'
import { checkAuth, checkRole } from '../middlewares/authMiddleware';
import { createProductReview, deleteProductReview, getProductReview } from './review.controller';


const router=express.Router()


router.post('/products/rating',checkAuth,createProductReview)
router.get('/products/rating',checkAuth,getProductReview)
router.delete('/products/rating/delete',checkAuth,deleteProductReview)



export default router  