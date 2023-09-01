import express from 'express'
import { loginUser, signUpUser } from './user.controller'

const router=express.Router()

router.post('/users/signup',signUpUser)
router.post('/users/login',loginUser)
// router.get('/categories',getAllCatgerories)
// router.get('/categories/:id',getSingleCatgerory)
// router.put('/categories/:id',updateCategory)
// router.delete('/categories/:id',deleteCategory)


export default router  