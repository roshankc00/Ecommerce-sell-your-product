import express from 'express'
import categoryRoute from '../category/category.route'
import brandRoute from '../brand/brand.route'
import userRoute from '../Users/user.routes'
import storeRoute from '../store/store.route'
import productRoute from '../Product/product.route'

const router=express.Router()


router.use(categoryRoute)
router.use(brandRoute)
router.use(userRoute)
router.use(storeRoute)
router.use(productRoute)


export default router