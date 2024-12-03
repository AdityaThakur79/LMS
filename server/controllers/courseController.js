import { Course } from "../models/course.js";
import { Lecture } from "../models/lecture.js";
import {
  deleteMediaFromCloudinary,
  deleteVideoFromCloudinary,
  uploadMedia,
} from "../utils/cloudinary.js";

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

export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);
    return res.status(200).send({
      message: "Course Fetched Successfully By Id",
      success: true,
      course,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .send({ success: false, message: "Error in fetching Course By Id" });
  }
};

export const createLecture = async (req, res) => {
  try {
    const { lectureTitle } = req.body;
    const { courseId } = req.params;
    if (!lectureTitle || !courseId) {
      return res.status(400).send({
        message: "Lecture Title is required",
        success: false,
      });
    }
    const lecture = await Lecture.create({ lectureTitle });
    const course = await Course.findById(courseId);
    if (course) {
      course.lectures.push(lecture._id);
      await course.save();
    }

    return res.status(201).send({
      message: "Lecture Created Successfully",
      lecture,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .send({ success: false, message: "Error in Creating Lecture" });
  }
};

export const updateLecture = async (req, res) => {
  try {
    const { lectureTitle, videoInfo, isPreviewFree } = req.body;
    const { courseId, lectureId } = req.params;
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).send({ message: "Lecture Not Found" });
    }
    //update lecture
    if (lectureTitle) {
      lecture.lectureTitle = lectureTitle;
    }
    if (videoInfo?.videoUrl) {
      lecture.videoUrl = videoInfo.videoUrl;
    }
    if (videoInfo?.publicId) {
      lecture.publicId = videoInfo.publicId;
    }
    if (isPreviewFree) {
      lecture.isPreviewFree = isPreviewFree;
    }

    await lecture.save();

    //ensure course has the lecture id
    const course = await Course.findById(courseId);
    if (course && !course.lectures.includes(lecture._id)) {
      course.lectures.push(lecture._id);
    }
    return res
      .status(200)
      .send({ message: "Lecture Updated Successfully", lecture });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Error in Updating Lecture", success: false, error });
  }
};

export const removeLecture = async (req, res) => {
  try {
    const { lectureId, courseId } = req.params;
    const lecture = await Lecture.findByIdAndDelete(lectureId);

    //delete lecture from cloudinary
    if (lecture.publicId) {
      await deleteVideoFromCloudinary(lecture.publicId);
    }
    //delete lecture from course
    await Course.updateOne(
      { lectures: lectureId },
      { $pull: { lectures: lectureId } }
    );
    return res.status(200).send({ message: "Lecture Deleted Successfully" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error in Removing Lecture", success: false, error });
  }
};

export const getCourseLectures = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).populate("lectures");

    if (!course) {
      return res
        .status(400)
        .send({ message: "Course Not Found", success: false });
    }
    return res.status(200).send({
      message: "Lectures Fetched Successfully",
      lectures: course.lectures,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Lectures Fetching Error", success: false, error });
  }
};

export const getLectureById = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).send({ message: "Lecture Not Found" });
    }
    return res.status(200).send({
      message: "Lecture fetched successfully",
      success: true,
      lecture,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error while fetching the lecture by Id",
      error,
      success: false,
    });
  }
};
