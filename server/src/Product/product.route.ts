import express from 'express'
import { checkAuth, checkRole } from '../middlewares/authMiddleware';
import upload from '../middlewares/multer.middleware'
import { createProduct, getALLProduct, getASingleProduct } from './product.controller';

const router=express.Router()
router.post('/products',checkAuth,upload.array('images',10),createProduct)
router.get('/products/:id',checkAuth,getASingleProduct)
router.get('/products',checkAuth,getALLProduct)



export default router  