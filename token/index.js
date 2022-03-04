require('dotenv').config();
const jwt = require('jsonwebtoken');

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const generateToken = (id) => {
  const secret = process.env.JWT_SECRET;
  const token = jwt.sign({ data: { id } }, secret, jwtConfig);
  return { token };
};

module.exports = {
  generateToken,
};
