const { validate } = require('../schemas/categorySchema');

const validateKeysBlank = (req, res, next) => {
  const { name } = req.body;
  const { code, message } = validate(name);
  if (message) {
    return res.status(code).json({ message });
  }
  next();
};

module.exports = {
  validateKeysBlank,
};
