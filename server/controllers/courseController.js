import { Course } from "../models/course.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

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

export const updateCourseController = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
    } = req.body;
    const thumbnail = req.file;

    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(500).send({ message: "Course Not Found", error });
    }

    let courseThumbnail;
    if (thumbnail) {
      if (course.courseThumbnail) {
        const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
        //delete old thumbnail
        await deleteMediaFromCloudinary(publicId);
      }
      //upload new thumbnail
      courseThumbnail = await uploadMedia(thumbnail.path);
    }

    //updated data
    const updatedData = {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
      courseThumbnail: courseThumbnail?.secure_url,
    };

    course = await Course.findByIdAndUpdate(courseId, updatedData);

    return res
      .status(200)
      .send({ success: true, message: "Course Updated Successfully", course });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Something Went wrong while Updating course", error });
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
