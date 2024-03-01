import express from 'express'
import { getMessage, sendMessage } from '../controller/message.controller.js'
import protectRoute from '../middleware/protect.middleware.js'

const router=express()

router.post("/send/:id",protectRoute,sendMessage)
router.get("/:id",protectRoute,getMessage)
export default router