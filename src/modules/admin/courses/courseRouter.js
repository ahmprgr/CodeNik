const express = require("express");
const {
  addCourse,
  deleteCourse,
  getCourse,
  editCourse,
} = require("./courseController");
const validator = require("./../../../middlewares/validator");
const authGuard = require("./../../../middlewares/authGuard");
const isAdmin = require("./../../../middlewares/isAdmin");
const courseValidationSchema = require("./../../../utils/validators/courseValidator");
const imgUploader = require("./../../../middlewares/upload/imgUploader");

const router = express.Router();

router.post(
  "/addCourse",
  authGuard,
  isAdmin,
  imgUploader.single("cover"),
  validator(courseValidationSchema),
  addCourse
);
router.put("/editCourse", authGuard, isAdmin, editCourse);
router.get("/getCourse", getCourse);
router.delete("/deleteCourse", authGuard, isAdmin, deleteCourse);

module.exports = router;
