import express from "express";
import {
  createCourseController,
  createLecture,
  getCourseById,
  getCourseLectures,
  getCreatorCourses,
  getLectureById,
  removeLecture,
  updateCourseController,
  updateLecture,
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

router.get(
  "/:courseId",
  isAuthenticated,
  upload.single("courseThumbnail"),
  getCourseById
);
router.post("/:courseId/lecture", isAuthenticated, createLecture);

router.get("/:courseId/lecture", isAuthenticated, getCourseLectures);
router.post("/:courseId/lecture/:lectureId", isAuthenticated, updateLecture);
router.delete("/:courseId/lecture/:lectureId", isAuthenticated, removeLecture);
router.get("/lecture/:lectureId", isAuthenticated, getLectureById);

export default router;
