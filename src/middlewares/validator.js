const validator = (schema) => {
  return async (req, res, next) => {
    try {
      const result = await schema.validate(req.body, {
        abortEarly: false,
      });
      next();
    } catch (err) {

      const errorDetails = err.message
      return res.status(500).json({ message: errorDetails });
    }
  };
};

module.exports = validator;
