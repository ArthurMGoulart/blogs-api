const { validatePost, validateUpdate } = require('../schemas/postSchema');
const { BlogPost, Category } = require('../models');

const validatePostValues = (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  const { code, message } = validatePost(title, content, categoryIds);
  if (message) {
    return res.status(code).json({ message });
  }
  next();
};

const validateUpdateValues = (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  const { code, message } = validateUpdate(title, content, categoryIds);
  if (message) {
    return res.status(code).json({ message });
  }
  next();
};

const validateUser = (req, res, next) => {
  const { id } = res.locals.user.dataValues;
  const { userId } = res.locals.post.dataValues;
  if (id !== userId) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }
  next();
};

const validateCategoryIds = async (req, res, next) => {
  const { categoryIds } = req.body;
  let objError = {};
  if (!categoryIds) {
    return res.status(400).json({ message: '"categoryIds" is required' });
  }
  const validations = await categoryIds.map(async (categoryId) => {
    const existsCategory = await Category.findOne({ where: { id: categoryId } });
    if (!existsCategory) {
      objError = {
        code: 400,
        message: '"categoryIds" not found',
      };
    }
  });
  await Promise.all(validations);
  const { code, message } = objError;
  if (message) return res.status(code).json({ message });
  next();
};

const validateId = async (req, res, next) => {
  const { id } = req.params;
  const post = await BlogPost.findOne({ where: { id } });
  if (!post) {
    return res.status(404).json({ message: 'Post does not exist' });
  }
  res.locals.post = post;
  next();
};

module.exports = {
  validatePostValues,
  validateCategoryIds,
  validateUpdateValues,
  validateUser,
  validateId,
};
