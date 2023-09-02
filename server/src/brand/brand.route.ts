
import express from 'express'
import { createBrand, deleteBrand, getASingleBrand, getAllBrands, updateBrand } from './brand.controller'
import { checkAuth, checkRole } from '../middlewares/authMiddleware'

const router=express.Router()

router.post('/brands',checkAuth,checkRole('admin'),createBrand)
router.get('/brands',getAllBrands)
router.get('/brands/:id',getASingleBrand)
router.put('/brands/:id',checkAuth,checkRole('admin'),updateBrand)
router.delete('/brands/:id',checkAuth,checkRole('admin'),deleteBrand)


export default router  