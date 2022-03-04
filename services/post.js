const { Op } = require('sequelize');
const { BlogPost, PostCategory, User, Category } = require('../models');

const getAll = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return posts;
};

const getById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return post;
};

const getBySearch = async (query) => {
  if (query === '') return getAll();
  const posts = await BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: query },
        { content: query },
      ],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return posts;
};

const updatePost = async (postToUpdate, title, content) => {
  await postToUpdate.update({ title, content });
  await postToUpdate.save();
  const returnGood = await BlogPost.findOne({
    where: { id: postToUpdate.dataValues.id },
    attributes: { exclude: ['id', 'published', 'updated'] },
    include: [
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return returnGood;
};

const postPost = async (title, content, categoryIds, userId) => {
  const dateNow = new Date();
  const post = await BlogPost.create({ title,
    content,
    categoryIds,
    userId,
    published: dateNow,
    updated: dateNow,
  });

  categoryIds.forEach(async (categoryId) => {
    await PostCategory.create({ postId: post.id, categoryId });
  });

  return post;
};

const deletePost = async (postToDelete) => {
  await postToDelete.destroy();
};

module.exports = {
  getAll,
  getById,
  getBySearch,
  postPost,
  updatePost,
  deletePost,
};