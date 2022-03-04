const { validateUndefinedSchema, validateValuesSchema } = require('../schemas/userSchema');

const validateKeysBlank = (req, res, next) => {
  const { displayName, email, password } = req.body;
  const { code, message } = validateUndefinedSchema(displayName, email, password);
  if (message) {
    return res.status(code).json({ message });
  }
  next();
};

const validateUserValues = (req, res, next) => {
  const { displayName, email, password } = req.body;
  const { code, message } = validateValuesSchema(displayName, email, password);
  if (message) {
    return res.status(code).json({ message });
  }
  next();
};

module.exports = {
  validateKeysBlank,
  validateUserValues,
};