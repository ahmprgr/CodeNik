const courseModel = require("./courseModel")

exports.addCourse = async (req, res) => {
  try{
    const { name, description, slug } = req.body
    const cover = req.file
  } catch (e) {

  }
};
exports.editCourse = async (req, res) => {};
exports.deleteCourse = async (req, res) => {};
exports.getCourse = async (req, res) => {};
