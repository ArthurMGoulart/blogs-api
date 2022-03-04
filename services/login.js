const { User } = require('../models');
const { generateToken } = require('../token');

const login = async (email) => {
  const userByEmail = await User.findOne({ where: { email } });
  if (!userByEmail) {
    return {
      code: 400,
      message: 'Invalid fields',
    };
  }
  const token = generateToken(userByEmail.dataValues.id);
  return token;
};

module.exports = {
  login,
};