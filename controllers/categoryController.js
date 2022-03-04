const express = require('express');
const categoryService = require('../services/category');
const { validateKeysBlank } = require('../middlewares/category');
const validateJWT = require('../auth/validateJWT');

const categoryRouter = express.Router();

const getAll = async (req, res, next) => {
  try {
    const categories = await categoryService.getAll();
    return res.status(200).json(categories);
  } catch (e) {
    next(e);
  }
};

const postCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const category = await categoryService.postCategory(name);
    return res.status(201).json(category);
  } catch (e) {
    next(e);
  }
};

categoryRouter.post('/', validateJWT, validateKeysBlank, postCategory);
categoryRouter.get('/', validateJWT, getAll);

module.exports = {
  categoryRouter,
};