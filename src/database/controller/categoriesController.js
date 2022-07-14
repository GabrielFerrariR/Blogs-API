const categoriesService = require('../services/categoriesService');

const create = async (req, res, next) => {
  try {
    const token = await categoriesService.create(req.body);
    res.status(201).json(token);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
};