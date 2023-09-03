import express from 'express'
import categoryRoute from '../category/category.route'
import brandRoute from '../brand/brand.route'
import userRoute from '../Users/user.routes'
import storeRoute from '../store/store.route'
import productRoute from '../Product/product.route'
import reviewRoute from '../review/review.routes'
import orderRoute from '../orders/order.route'

const router=express.Router()


router.use(categoryRoute)
router.use(brandRoute)
router.use(userRoute)
router.use(storeRoute)
router.use(reviewRoute)
router.use(productRoute)
router.use(orderRoute)


export default router