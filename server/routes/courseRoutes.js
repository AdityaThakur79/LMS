import express from "express";
import {
  createCourseController,
  createLecture,
  getAllPublishedCourses,
  getCourseById,
  getCourseLectures,
  getCreatorCourses,
  getLectureById,
  removeLecture,
  togglePublishCourse,
  updateCourseController,
  updateLecture,
} from "../controllers/courseController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../utils/multer.js";
const router = express.Router();

router.post("/", isAuthenticated, createCourseController);
router.get("/", isAuthenticated, getCreatorCourses);
router.get("/published-courses", getAllPublishedCourses);
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
router.patch("/:courseId", isAuthenticated, togglePublishCourse);

export default router;
