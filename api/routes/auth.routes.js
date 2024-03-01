import express from 'express'
import { logOut, loginUser, singupUser } from '../controller/auth.controller.js'
const router=express.Router()

router.post('/signup',singupUser)

router.post('/login',loginUser)

router.get('/logout',logOut)

export default router;