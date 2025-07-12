const courseModel = require("./courseModel");
const fs = require("fs");
const userModel = require("./../../user/auth/userModel");
const path = require("path");

exports.addCourse = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.session.user });
    const { name, description, slug } = req.body;
    const cover = req.file;
    const isDuplicatedSlug = await courseModel.findOne({ slug });
    if (!isDuplicatedSlug) {
      const course = await courseModel.create({
        name,
        description,
        slug,
        cover: `/uploads/img/${cover.filename}`,
        author: user.userid,
        ...courseModel.status,
      });
      return res.status(201).json({
        message: "The course created successfuly",
        course,
      });
    } else {
      return res.status(409).json({
        message: "you can not create a course with this slug",
      });
    }
  } catch (e) {
    return res.status(500).json({
      message: "internal server error",
      error: e.errors,
    });
  }
};
exports.editCourse = async (req, res) => {
  try {
    const { slug, name, description, status } = req.body;
    const id = req.query.id;
    const course = await courseModel.findOne({ _id: id });
    const cover = req.file ? `/uploads/img/${req.file.filename}` : course.cover;
    const isDuplicatedSlug = await courseModel.findOne({
      slug,
      _id: { $ne: course._id },
    });
    if (!isDuplicatedSlug) {
      const oldProfilePath = path.join(
        __dirname,
        "..",
        "..",
        "..",
        "public",
        course.cover.startsWith("/") ? course.cover.slice(1) : course.cover
      );
      fs.unlink(oldProfilePath, (e) => {
        if (e) console.log(e);
      });
      await courseModel.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            slug,
            name,
            description,
            cover,
            status,
          },
        }
      );
      return res.json({
        message: "The course updated",
      });
    } else {
      return res.json({
        message: "your slug already exists",
      });
    }
  } catch (e) {
    return res.status(500).json({
      message: "internal server error",
      error: e.errors,
    });
  }
};
exports.deleteCourse = async (req, res) => {};
exports.getCourse = async (req, res) => {
  try {
    const courses = await courseModel.find({}).lean();
    return res.json({
      courses,
    });
  } catch (e) {
    return res.status(500).json({
      message: "internal server error",
      error: e.errors,
    });
  }
};
exports.getOneCourse = async (req, res) => {
  try {
    const slug = req.params.slug;
    const searchedCourse = await courseModel.findOne(
      { slug },
      { updatedAt: 0, createdAt: 0, _id: 0, status: 0, __v: 0 }
    );
    if (searchedCourse) {
      return res.json({
        searchedCourse,
      });
    } else {
      return res.status(404).json({
        message: "course not found",
      });
    }
  } catch (e) {
    return res.status(500).json({
      message: "internal server error",
      error: e.message,
    });
  }
};
