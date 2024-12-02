import express from "express";
import {
  createCourseController,
  getCreatorCourses,
} from "../controllers/courseController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/", isAuthenticated, createCourseController);
router.get("/", isAuthenticated, getCreatorCourses);

export default router;
