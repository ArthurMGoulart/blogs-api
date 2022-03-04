const errors = {
  titleUndefined: {
    code: 400,
    message: '"title" is required',
  },
  contentUndefined: {
    code: 400,
    message: '"content" is required',
  },
  categoryIdsUndefined: {
    code: 400,
    message: '"categoryId" is required',
  },
  categoriesIdsNotUndefined: {
    code: 400,
    message: 'Categories cannot be edited',
  },
};

const isUndefined = (value) => (!value);

const isNotUndefined = (value) => (value !== undefined);

const validatePost = (title, content, categoryIds) => {
  switch (true) {
    case isUndefined(title): return { ...errors.titleUndefined };
    case isUndefined(content): return { ...errors.contentUndefined };
    case isUndefined(categoryIds): return { ...errors.categoryIdUndefined };
    default: return {};
  }
};

const validateUpdate = (title, content, categoryIds) => {
  switch (true) {
    case isUndefined(title): return { ...errors.titleUndefined };
    case isUndefined(content): return { ...errors.contentUndefined };
    case isNotUndefined(categoryIds): return { ...errors.categoriesIdsNotUndefined };
    default: return {};
  }
};

module.exports = {
  validatePost,
  validateUpdate,
};