const express = require('express');
const UserService = require('../services/user');
const { validateKeysBlank, validateUserValues } = require('../middlewares/user');
const validateJWT = require('../auth/validateJWT');

const userRouter = express.Router();

const postUser = async (req, res, next) => {
  try {
    const user = await UserService.postUser(req.body);
    const { code, message } = user;
    if (message) {
      return res.status(code).json({ message });
    }
    return res.status(201).json(user);
  } catch (e) {
    next(e);
  }
};

const getAll = async (req, res, next) => {
  try {
    const users = await UserService.getAll();
    return res.status(200).json(users);
  } catch (e) {
    next(e);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await UserService.getById(id);
    const { code, message } = user;
    if (message) {
      return res.status(code).json({ message });
    }
    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

const deleteMe = async (req, res, next) => {
  try {
    const me = res.locals.user;
    await UserService.deleteMe(me);
    return res.status(204).json({});
  } catch (e) {
    next(e);
  }
};

userRouter.post('/', validateKeysBlank, validateUserValues, postUser);
userRouter.get('/', validateJWT, getAll);
userRouter.get('/:id', validateJWT, getById);
userRouter.delete('/me', validateJWT, deleteMe);

module.exports = {
  userRouter,
};
