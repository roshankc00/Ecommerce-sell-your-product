import express from 'express'
import categoryRoute from '../category/category.route'
import brandRoute from '../brand/brand.route'
import userRoute from '../Users/user.routes'

const router=express.Router()


router.use(categoryRoute)
router.use(brandRoute)
router.use(userRoute)


export default router