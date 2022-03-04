const { User } = require('../models');
const { generateToken } = require('../token');

const getAll = async () => {
  const users = await User.findAll();
  return users;
};

const getById = async (id) => {
  const user = await User.findOne({ where: { id } });
  if (!user) {
    return {
      code: 404,
      message: 'User does not exist',
    };
  }
  return user;
};

const getByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

const validateEmail = async (email) => {
  const user = await getByEmail(email);
  if (user) {
    console.log(user);
    return {
      code: 409,
      message: 'User already registered',
    };
  }
  return {};
};

const postUser = async (userInfo) => {
  const { displayName, email, password, image } = userInfo;
  const userDuplicated = await validateEmail(email);
  if (userDuplicated.message) {
    return userDuplicated;
  }
  const user = await User.create({ displayName, email, password, image });
  const token = generateToken(user.dataValues.id);
  return token;
};

const deleteMe = async (me) => {
  await me.destroy();
};

module.exports = {
  getAll,
  getById,
  postUser,
  deleteMe,
};