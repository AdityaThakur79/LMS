import express from "express";
import { createCourseController } from "../controllers/courseController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/", isAuthenticated, createCourseController);

export default router;
