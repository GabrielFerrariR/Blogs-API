const postService = require('../services/postService');

const create = async (req, res, next) => {
  try {
    const post = await postService.create(req.body, req.user);
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

const show = async (_req, res, next) => {
  try {
    const post = await postService.show();
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  show,
};