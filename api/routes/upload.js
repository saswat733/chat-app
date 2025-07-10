import { Router } from "express";
import upload from "../middleware/upload";

const router=Router();

router.post("/",upload.single('file'),uploadFile)