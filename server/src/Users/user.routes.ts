import express from 'express'
import { loginUser, logout, signUpUser } from './user.controller'
import { checkAuth } from '../middlewares/authMiddleware'

const router=express.Router()

router.post('/users/signup',signUpUser)
router.post('/users/login',loginUser)
router.get('/users/logout',checkAuth,logout)


export default router  