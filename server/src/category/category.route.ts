import express from 'express'
import { addCatgory, deleteCategory, getAllCatgerories, getSingleCatgerory, updateCategory } from './category.controller'
import { checkAuth, checkRole } from '../middlewares/authMiddleware'

const router=express.Router()

router.post('/categories',checkAuth,checkRole('admin'),addCatgory)
router.get('/categories',getAllCatgerories)
router.get('/categories/:id',getSingleCatgerory)
router.put('/categories/:id',checkAuth,checkRole('admin'),updateCategory)
router.delete('/categories/:id',checkAuth,checkRole('admin'),deleteCategory)


export default router  