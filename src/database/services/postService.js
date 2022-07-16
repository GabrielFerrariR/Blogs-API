const Joi = require('joi');
const { Op } = require('sequelize');
const { CustomError } = require('../middlewares/error');
const { User, Category, BlogPost, PostCategory } = require('../models');

const postSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().items(Joi.number().required()).required(),
}).messages({
  'any.required': 'Some required fields are missing',
  'string.empty': 'Some required fields are missing',
});

const upPostSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
}).messages({
  'any.required': 'Some required fields are missing',
  'string.empty': 'Some required fields are missing',
});

const categoryValidation = async (categories) => {
 const isValid = (await Promise.all(categories.map(async (id) => Category.findByPk(id))));
 return (isValid.includes(null)); 
};

const postQuery = {
  include: [{
    model: User,
    as: 'user',
    attributes: {
      exclude: ['password'],
    },
  }, {
    model: Category,
    as: 'categories',
  }],
};

const create = async (body, user) => {
  const { error } = postSchema.validate(body);
  if (error) throw new CustomError(400, error.details[0].message);

  const { categoryIds, ...fields } = body;
  const isAnyInvalid = await categoryValidation(categoryIds);
  if (isAnyInvalid) throw new CustomError(400, '"categoryIds" not found');
  const post = await BlogPost.create({ ...fields, userId: user.id });
  categoryIds.map(async (categoryId) => {
    await PostCategory.create({ postId: post.id, categoryId });
  });
  return post;
};

const show = async () => {
  const posts = await BlogPost.findAll(postQuery);
  return posts;
};

const getById = async (id) => {
  const post = await BlogPost.findByPk(id, postQuery);
  if (!post) throw new CustomError(404, 'Post does not exist');
  return post;
};

const update = async (body, user, postId) => {
  const { error } = upPostSchema.validate(body);
  if (error) throw new CustomError(400, error.details[0].message);
  const [post] = await BlogPost.update(body, {
    where: { 
      [Op.and]: [{ id: postId }, { userId: user.id }], 
    },
  });
  if (!post) throw new CustomError(401, 'Unauthorized user');
  
  return getById(postId);
};

const remove = async (postId, user) => {
  await getById(postId);
  const deleted = await BlogPost.destroy({
    where: { 
      [Op.and]: [{ id: postId }, { userId: user.id }], 
    },
  });
  if (!deleted) throw new CustomError(401, 'Unauthorized user');
};

const showByQ = async (query) => {
  if (!query) return show();
  const queryResult = await BlogPost.findAll({
    where: { [Op.or]: [{ title: {
          [Op.like]: `%${query}%`,
        },
      }, { content: {
          [Op.like]: `%${query}%`,
        },
      }],
    },
    ...postQuery,
  });
  return queryResult;
};

module.exports = {
  create,
  show,
  getById,
  update,
  remove,
  showByQ,
};