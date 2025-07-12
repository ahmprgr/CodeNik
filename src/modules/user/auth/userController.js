const userModel = require("./userModel");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");

exports.register = async (req, res) => {
  try {
    const userCount = await userModel.countDocuments();
    const { fullname, email, password, confirmPassword } = req.body;
    const duplicatedUser = await userModel.findOne({ email });
    if (!duplicatedUser) {
      if (password === confirmPassword) {
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await userModel.create({
          fullname,
          email,
          password: hashedPassword,
          ...userModel.userid,
          role: userCount >= 2 ? "user" : "admin",
        });
        req.session.user = user._id;
        const userObj = user.toObject();
        Reflect.deleteProperty(userObj, "password");
        return res.status(201).json({
          message: "user registered successfuly",
          userObj,
        });
      } else {
        return res.status(422).json({
          message:
            "your password and your confirm password isn't equal to each other",
        });
      }
    } else {
      return res.status(409).json({
        message: "you can't create account with this email",
      });
    }
  } catch (e) {
    return res.status(500).json({
      message: "internal server error",
      error: e.message,
    });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    const comparePassword = await bcrypt.compare(password, user.password);
    if (user && comparePassword) {
      req.session.user = user._id;
      console.log(req.session.user);
      return res.json({
        message: "you're logged in successfuly",
      });
    } else {
      return res.status(422).json({
        message: "this user with this info doesen't exist",
      });
    }
  } catch (e) {
    return res.status(500).json({
      message: "internal server error",
      error: e.message,
    });
  }
};
exports.deleteAccount = async (req, res) => {
  try {
    const { id } = req.query;
    const deletedUser = await userModel.deleteOne({ _id: id });
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({
          message: "logout failed",
        });
      }
    });
    res.clearCookie("connect.sid");
    return res.json({
      message: "user deleted successfuly",
    });
  } catch (e) {
    return res.status(500).json({
      message: "internal server error",
      error: e.message,
    });
  }
};
exports.editProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.session.user);
    const { fullname, password, email, userid } = req.body;
    const profile = req.file
      ? `/uploads/img/${req.file.filename}`
      : user.profile;

    const isDuplicatedEmail = await userModel.findOne({
      email,
      _id: { $ne: user._id }
    });

    const isDuplicatedUserId = await userModel.findOne({
      userid,
      _id: { $ne: user._id },
    });

    if (!isDuplicatedEmail && !isDuplicatedUserId) {
      if (req.file && user.profile) {
        const oldProfilePath = path.join(
          __dirname,
          "..",
          "..",
          "..",
          "public",
          user.profile.startsWith("/") ? user.profile.slice(1) : user.profile
        );
        fs.unlink(oldProfilePath, (e) => {
          if (e) console.log(e);
        });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const newUserInfo = await userModel.updateOne(
        { _id: user._id },
        {
          $set: {
            userid,
            email,
            fullname,
            password: hashedPassword,
            profile,
          },
        }
      );

      return res.json({
        message: "user updated successfully",
        info: newUserInfo,
      });
    } else {
      return res.status(409).json({
        message: "you can't change your info with this input",
      });
    }
  } catch (e) {
    return res.status(500).json({
      message: "internal server error",
      error: e.message,
    });
  }
};
exports.logout = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({
          message: "logout failed",
        });
      }
    });
    res.clearCookie("connect.sid");
    return res.json({
      message: "you've logged out successfuly",
    });
  } catch (e) {
    return res.status(500).json({
      message: "internal server error",
      error: e.message,
    });
  }
};
exports.getMe = async (req, res) => {
  try {
    const userId = req.session.user;
    const userInfo = await userModel.findOne({ _id: userId });
    return res.json({
      user: userInfo,
    });
  } catch (e) {
    return res.status(500).json({
      message: "internal server error",
      error: e.message,
    });
  }
};
