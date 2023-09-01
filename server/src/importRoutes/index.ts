import express from 'express'
import categoryRoute from '../category/category.route'

const router=express.Router()


router.use(categoryRoute)


export default router