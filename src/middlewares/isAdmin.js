const userModel = require("./../modules/user/auth/userModel");

const isAdmin = async (req, res, next) => {
  try {
    const userId = req.session.user;
    const user = await userModel.findOne({ _id: userId });
    if (user.role === "admin") {
      next();
    } else {
      return res.status(403).json({
        message: "forbidden!!",
      });
    }
  } catch (e) {
    res.status(500).json({
      message: "internal server error",
      error: e.message,
    });
  }
};

module.exports = isAdmin;
