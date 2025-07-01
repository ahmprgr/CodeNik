const express = require("express");
const userSchema = require("./../../../utils/validators/authValidator");
const validator = require("./../../../middlewares/validator");
const authGuard = require("../../../middlewares/authGuard");
const uploader = require("../../../middlewares/upload/imgUploader");

const {
  deleteAccount,
  editProfile,
  register,
  login,
  logout,
} = require(".//userController");

const router = express.Router();

router.post("/register", validator(userSchema), register);
router.post("/login", login);
router.put("/editprofile", authGuard, uploader.single("profile"), editProfile);
router.delete("/deleteaccount", deleteAccount);
router.post("/logout", logout);
module.exports = router;
