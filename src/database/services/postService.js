const Joi = require('joi');
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

const categoryValidation = async (categories) => {
 const isValid = (await Promise.all(categories.map(async (id) => Category.findByPk(id))));
 return (isValid.includes(null)); 
};

const create = async (body, user) => {
  const { error } = postSchema.validate(body);
  if (error) throw new CustomError(400, error.details[0].message);

  const { categoryIds, ...fields } = body;
  const isAnyInvalid = await categoryValidation(categoryIds);
  if (isAnyInvalid) throw new CustomError(400, '"categoryIds" not found');
  
  const { id } = user.dataValues;
  const post = await BlogPost.create({ ...fields, userId: id });
  categoryIds.map(async (categoryId) => {
    await PostCategory.create({ postId: post.id, categoryId });
  });
  return post;
};

const show = async () => {
  const posts = await BlogPost.findAll({
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
  });
  return posts;
};

const getById = async (id) => {
  const post = await BlogPost.findByPk(id, {
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
  });
  if (!post) throw new CustomError(404, 'Post does not exist');
  return post;
};

module.exports = {
  create,
  show,
  getById,
};