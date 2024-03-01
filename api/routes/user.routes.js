import express from 'express'
import protectRoute from '../middleware/protect.middleware.js'
import { getUserForSidebar } from '../controller/user.controller.js'

const router=express()

router.get("/",protectRoute,getUserForSidebar)

export default router