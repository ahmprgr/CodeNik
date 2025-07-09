const courseModel = require("./courseModel");

exports.addCourse = async (req, res) => {
  try {
    const { name, description, slug } = req.body;
    const cover = req.file;
    const isDuplicatedSlug = await courseModel.findOne({ slug });
    if (!isDuplicatedSlug) {
      const course = await courseModel.create({
        name,
        description,
        slug,
        cover:cover.filename,
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
      message: "internal server error3115",
      error: e.errors,
    });
  }
};
exports.editCourse = async (req, res) => {};
exports.deleteCourse = async (req, res) => {};
exports.getCourse = async (req, res) => {};
