const express = require('express');

const loginRouter = express.Router();
const LoginService = require('../services/login');
const { validateLoginValues } = require('../middlewares/login');

const login = async (req, res, next) => {
  try {
    const { email } = req.body;
    const userLogged = await LoginService.login(email);
    const { code, message } = userLogged;
    if (message) {
      return res.status(code).json({ message });
    }
    return res.status(200).json(userLogged);
  } catch (e) {
    next(e);
  }
};

loginRouter.post('/', validateLoginValues, login);

module.exports = {
  loginRouter,
};