const express = require('express');
const validateJWT = require('../auth/validateJWT');
const { validatePostValues,
  validateCategoryIds,
  validateId,
  validateUpdateValues,
  validateUser,
} = require('../middlewares/post');
const PostService = require('../services/post');

const postRouter = express.Router();

const postPost = async (req, res, next) => {
  try {
    const { title, content, categoryIds } = req.body;
    const { id } = res.locals.user.dataValues;
    const post = await PostService.postPost(title, content, categoryIds, id);
    return res.status(201).json(post);
  } catch (e) {
    next(e);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const postToUpdate = res.locals.post;
    const updatedPost = await PostService.updatePost(postToUpdate, title, content);
    return res.status(200).json(updatedPost);
  } catch (e) {
    next(e);
  }
};

const getAll = async (req, res, next) => {
  try {
    const posts = await PostService.getAll();
    return res.status(200).json(posts);
  } catch (e) {
    next(e);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await PostService.getById(id);
    return res.status(200).json(post);
  } catch (e) {
    next(e);
  }
};

const getBySearch = async (req, res, next) => {
  try {
    const { q: query } = req.query;
    const posts = await PostService.getBySearch(query);
    return res.status(200).json(posts);
  } catch (e) {
    next(e);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const postToDelete = res.locals.post;
    await PostService.deletePost(postToDelete);
    return res.status(204).json({});
  } catch (e) {
    next(e);
  }
};

postRouter.post('/', validateJWT, validatePostValues, validateCategoryIds, postPost);
postRouter.get('/', validateJWT, getAll);
postRouter.get('/search', validateJWT, getBySearch);
postRouter.get('/:id', validateJWT, validateId, getById);
postRouter.put('/:id', validateJWT, validateUpdateValues, validateId,
validateUser,
updatePost);
postRouter.delete('/:id', validateJWT, validateId, validateUser, deletePost);

module.exports = { 
  postRouter,
};