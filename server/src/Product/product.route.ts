import express from 'express'
import { checkAuth, checkRole } from '../middlewares/authMiddleware';
import upload from '../middlewares/multer.middleware'
import { createProduct, getALLProduct, getASingleProduct } from './product.controller';
import ProductModel from './product.model';
import { filterResults } from '../middlewares/page_filter_search';
import { notFound } from '../middlewares/errorhandler.middleware';

const router=express.Router()
router.post('/products',checkAuth,upload.array('images',10),createProduct)
router.get('/products/:id',checkAuth,getASingleProduct)
router.get('/products',checkAuth,filterResults(ProductModel),getALLProduct)

export default router  