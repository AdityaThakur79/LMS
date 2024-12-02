import { Course } from "../models/course.js";

export const createCourseController = async (req, res) => {
  try {
    const { courseTitle, category } = req.body;
    if (!courseTitle || !category) {
      return res
        .status(404)
        .send({ success: false, message: "All Fields are Required" });
    }

    const course = await Course.create({
      courseTitle,
      category,
      creator: req.id,
    });
    return res
      .status(201)
      .send({ success: true, message: "Course Created Successfully", course });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Course Not Created" });
  }
};

export const getCreatorCourses = async (req, res) => {
  try {
    const userId = req.id;
    const courses = await Course.find({ creator: userId });
    if (!courses) {
      return res.status(404).send({ message: "Courses not Found" });
    }
    return res
      .status(200)
      .send({ success: true, message: "Courses Fetched", courses });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Something Went wrong while Fetching course", error });
  }
};
