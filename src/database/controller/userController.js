const userService = require('../services/userService');

const create = async (req, res, next) => {
  try {
    const token = await userService.create(req.body);
    res.status(201).json(token);
  } catch (error) {
    next(error);
  }
};

const show = async (req, res, next) => {
  try {
    const users = await userService.show();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  show,
};