const { validate } = require('../schemas/loginSchema');

const validateLoginValues = (req, res, next) => {
  const { email, password } = req.body;
  const { code, message } = validate(email, password);
  if (message) {
    return res.status(code).json({ message });
  }
  next();
};

module.exports = {
  validateLoginValues,
};