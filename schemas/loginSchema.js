const errors = {
  emailUndefined: {
    code: 400,
    message: '"email" is required',
  },
  passwordUndefined: {
    code: 400,
    message: '"password" is required',
  },
  emailBlank: {
    code: 400,
    message: '"email" is not allowed to be empty',
  },
  passwordBlank: {
    code: 400,
    message: '"password" is not allowed to be empty',
  },
};

const isUndefined = (value) => (!value);

const isBlank = (value) => (value === '');

const validate = (email, password) => {
  switch (true) {
    case isBlank(email): return { ...errors.emailBlank };
    case isBlank(password): return { ...errors.passwordBlank };
    case isUndefined(email): return { ...errors.emailUndefined };
    case isUndefined(password): return { ...errors.passwordUndefined };
    default: return {};
  }
};

module.exports = {
  validate,
};
