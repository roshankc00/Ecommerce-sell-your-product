import express from 'express'
import { RefreshToken, getASingleUser, getAllUser, loginUser, logout, signUpUser, uodateUserRole } from './user.controller'
import { checkAuth, checkRole } from '../middlewares/authMiddleware';

const router=express.Router()

router.post('/users/signup',signUpUser)
router.post('/users/login',loginUser)
router.get('/users/logout',checkAuth,logout)
router.get('/users',getAllUser)
router.post('/users/addrole',checkAuth,checkRole('admin'),uodateUserRole)
router.get('/users/refreshtoken',checkAuth,RefreshToken)


export default router  
