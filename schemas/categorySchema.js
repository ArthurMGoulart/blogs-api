const errors = {
  nameUndefined: {
    code: 400,
    message: '"name" is required',
  },
};

const isUndefined = (value) => (!value);

const validate = (name) => {
  switch (true) {
    case isUndefined(name): return { ...errors.nameUndefined };
    default: return {};
  }
};

module.exports = {
  validate,
};