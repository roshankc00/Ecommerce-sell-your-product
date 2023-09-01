
import express from 'express'
import { createBrand, deleteBrand, getASingleBrand, getAllBrands, updateBrand } from './brand.controller'

const router=express.Router()

router.post('/brands',createBrand)
router.get('/brands',getAllBrands)
router.get('/brands/:id',getASingleBrand)
router.put('/brands/:id',updateBrand)
router.delete('/brands/:id',deleteBrand)


export default router  