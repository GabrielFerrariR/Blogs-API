const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { CustomError } = require('../middlewares/error');
const { User } = require('../models');

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
}).messages({
  'any.required': 'Some required fields are missing',
  'string.empty': 'Some required fields are missing',
});

const authentication = async (body) => {
  const { error } = loginSchema.validate(body);
  if (error) throw new CustomError(400, error.details[0].message);
  const user = await User.findOne({
    where: {
      email: body.email,
      password: body.password,
    },
  });
  if (!user) throw new CustomError(400, 'Invalid fields');
  const token = jwt.sign({ data: body.email }, process.env.JWT_SECRET, jwtConfig);
  return {
    token,
  };
};

module.exports = {
  authentication,
};