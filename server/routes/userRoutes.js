import { registerController,loginContoller } from "../controllers/userController.js";
import express from "express";

const router = express.Router();

router.post("/register",registerController);
router.post("/login",loginContoller);

export default router;