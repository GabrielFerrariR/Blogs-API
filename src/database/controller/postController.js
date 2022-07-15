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
    const posts = await postService.show();
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await postService.getById(id);
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await postService.update(req.body, req.user, id);
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    await postService.remove(id, req.user);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const showByQ = async (req, res, next) => {
  try {
    const { q } = req.query;
    const queryResult = await postService.showByQ(q);
    res.status(200).json(queryResult);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  show,
  getById,
  update,
  remove,
  showByQ,
};