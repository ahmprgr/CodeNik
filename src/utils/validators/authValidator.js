const yup = require("yup");

const userValidationSchema = yup.object({
  fullname:yup.string().min(10).max(50).required(),
  email:yup.string().email().required(),
  password:yup.string().min(8).max(25)
})

module.exports = userValidationSchema