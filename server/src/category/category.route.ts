import express from 'express'
import { addCatgory, deleteCategory, getAllCatgerories, getSingleCatgerory, updateCategory } from './category.controller'

const router=express.Router()

router.post('/categories',addCatgory)
router.get('/categories',getAllCatgerories)
router.get('/categories/:id',getSingleCatgerory)
router.put('/categories/:id',updateCategory)
router.delete('/categories/:id',deleteCategory)


export default router  