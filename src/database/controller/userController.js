const userService = require('../services/userService');

const create = async (req, res, next) => {
  try {
    const token = await userService.create(req.body);
    res.status(201).json(token);
  } catch (error) {
    next(error);
  }
};

const show = async (_req, res, next) => {
  try {
    const users = await userService.show();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const showUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const users = await userService.showUser(id);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
     await userService.remove(req.user);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  show,
  showUser,
  remove,
};