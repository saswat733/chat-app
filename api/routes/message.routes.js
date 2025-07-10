import express from "express";
import {
  getMessage,
  sendMessage,
  sendFileMessage,
} from "../controller/message.controller.js";
import protectRoute from "../middleware/protect.middleware.js";
import { upload } from "../config/cloudinary.js";

const router = express();

router.post("/send/:id", protectRoute, sendMessage);
router.post(
  "/send-file/:id",
  protectRoute,
  upload.single("file"),
  sendFileMessage
);
router.get("/:id", protectRoute, getMessage);
export default router;
