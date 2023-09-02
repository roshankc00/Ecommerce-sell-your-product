import express from 'express'
import { checkAuth, checkRole } from '../middlewares/authMiddleware';
import { addStore, getAllStore, getsingleStore, updateStore } from './store.controller'
import upload from '../middlewares/multer.middleware'

const router=express.Router()
router.patch('/stores/:id',checkAuth,upload.single('logo'),updateStore)

router.post('/stores',checkAuth,checkRole('user'),upload.single('logo'),addStore)
router.get('/stores/:id',checkAuth,getsingleStore)
router.get('/stores',checkAuth,getAllStore)



export default router  