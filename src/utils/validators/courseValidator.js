const yup = require("yup");

const courseValidationSchema = yup.object({
  name:yup.string().min(10).max(30).required(),
  description:yup.string().min(50).max(2000).required(),
  slug:yup.string().min(4).max(25).required(),
  cover:yup.string().min(33).max(33).required(),
})

module.exports = courseValidationSchema