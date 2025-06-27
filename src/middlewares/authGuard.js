const authGuard = (req, res, next) => {
  try {
    if (req.session && req.session.user) {
      next();
    } else {
      return res.status(401).json({
        message: "unAuthorized!!",
      });
    }
  } catch (e) {
    return res.json({
      message: "internal server error",
      error: e.message,
    });
  }
};

module.exports = authGuard;
