const validator = (schema) => {
  return async (req, res, next) => {
    try {
      const result = await schema.validate(req.body, {
        abortEarly: false,
      });
      next();
    } catch (err) {
      return res.status(500).json({ message: err.errors });
    }
  };
};

module.exports = validator;
