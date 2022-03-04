const emailValidator = require('email-validator');

const errors = {
  displayNameUndefined: {
    code: 400,
    message: '"displayName" is required',
  },
  emailUndefined: {
    code: 400,
    message: '"email" is required',
  },
  passwordUndefined: {
    code: 400,
    message: '"password" is required',
  },
  displayNameShort: {
    code: 400,
    message: '"displayName" length must be at least 8 characters long',
  },
  emailInvalid: {
    code: 400,
    message: '"email" must be a valid email',
  },
  passwordShort: {
    code: 400,
    message: '"password" length must be 6 characters long',
  },
};

const isUndefined = (value) => (!value);

const isStringShort = (string, minChars) => (string.length < minChars);

const isStringNotExactLength = (string, exactChars) => (string.length !== exactChars);

const isEmailNotValid = (email) => (!emailValidator.validate(email));

const validateUndefinedSchema = (displayName, email, password) => {
  switch (true) {
    case isUndefined(displayName): return { ...errors.displayNameUndefined };
    case isUndefined(email): return { ...errors.emailUndefined };
    case isUndefined(password): return { ...errors.passwordUndefined };
    default: return {};
  }
};

const validateValuesSchema = (displayName, email, password) => {
  switch (true) {
    case isStringShort(displayName, 8): return { ...errors.displayNameShort };
    case isStringNotExactLength(password, 6): return { ...errors.passwordShort };
    case isEmailNotValid(email): return { ...errors.emailInvalid };
    default: return {};
  }
};

module.exports = {
  validateUndefinedSchema,
  validateValuesSchema,
};