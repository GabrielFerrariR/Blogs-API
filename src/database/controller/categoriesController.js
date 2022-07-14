const categoriesService = require('../services/categoriesService');

const create = async (req, res, next) => {
  try {
    const token = await categoriesService.create(req.body);
    res.status(201).json(token);
  } catch (error) {
    next(error);
  }
};

const show = async (_req, res, next) => {
  try {
    const users = await categoriesService.show();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  show,
};