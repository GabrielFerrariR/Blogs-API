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

// eslint-disable-next-line max-lines-per-function
const create = async (body) => {
  const { error } = userSchema.validate(body);
  if (error) throw new CustomError(400, error.details[0].message);
  const isAlreadyInUse = await User.findOne({
    where: {
      email: body.email,
    },
  });

  // console.log('user  is new? -----------------', created);
  if (isAlreadyInUse) throw new CustomError(409, 'User already registered');
  await User.create(body);
  const token = jwt.sign({ data: body.email }, process.env.JWT_SECRET, jwtConfig);
  return {
    token,
  };
};

module.exports = {
  create,
};