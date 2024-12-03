import express from "express";
import {
  createCourseController,
  getCreatorCourses,
  updateCourseController,
} from "../controllers/courseController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../utils/multer.js";
const router = express.Router();

router.post("/", isAuthenticated, createCourseController);
router.get("/", isAuthenticated, getCreatorCourses);
router.put(
  "/:courseId",
  isAuthenticated,
  upload.single("courseThumbnail"),
  updateCourseController
);

export default router;
