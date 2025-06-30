const express = require("express");
const { addCourse, deleteCourse, getCourse, editCourse } = require("./courseController")

const router = express.Router()

router.post("/addCourse",addCourse)
router.put("/editCourse",editCourse)
router.get("/getCourse",getCourse)
router.delete("/deleteCourse",deleteCourse)

module.exports = router