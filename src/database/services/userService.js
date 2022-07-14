const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { CustomError } = require('../middlewares/error');

const userSchema = Joi.object({
  displayName: Joi.string().required().min(8),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6),
  image: Joi.string(),
});

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const create = async (body) => {
  const { error } = userSchema.validate(body);
  if (error) throw new CustomError(400, error.details[0].message);
  const isAlreadyInUse = await User.findOne({
    where: {
      email: body.email,
    },
  });
  if (isAlreadyInUse) throw new CustomError(409, 'User already registered');
  await User.create(body);
  const token = jwt.sign({ data: body.email }, process.env.JWT_SECRET, jwtConfig);
  return {
    token,
  };
};

const show = async () => {
  const users = await User.findAll({
    attributes: {
      exclude: ['password'],
    },
  });
  return users;
};

const showUser = async (id) => {
  const user = await User.findByPk(id, {
    attributes: {
      exclude: ['password'],
    },
  });
  if (!user) throw new CustomError(404, 'User does not exist');
  return user;
};

module.exports = {
  create,
  show,
  showUser,
};