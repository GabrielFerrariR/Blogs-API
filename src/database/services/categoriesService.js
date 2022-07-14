const Joi = require('joi');
const { CustomError } = require('../middlewares/error');
const { Category } = require('../models');

const categorySchema = Joi.object({
  name: Joi.string().required(),
});

const create = async (body) => {
  const { error } = categorySchema.validate(body);
  if (error) throw new CustomError(400, error.details[0].message);
  const category = await Category.create(body);
  return category;
};

const show = async () => {
  const users = await Category.findAll();
  return users;
};

module.exports = {
  create,
  show,
};