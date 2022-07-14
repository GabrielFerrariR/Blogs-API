const loginService = require('../services/loginService');

module.exports = async (req, res, next) => {
  try {
    const token = await loginService.authentication(req.body);
    res.status(200).json(token);
  } catch (error) {
    next(error);
  }
};