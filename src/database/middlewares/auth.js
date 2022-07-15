const jwt = require('jsonwebtoken');

const { User } = require('../models');
const { CustomError } = require('./error');

module.exports = async (req, _res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) throw new CustomError(401, 'Token not found');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      where: { email: decoded.data },
    });
    if (!user) throw new CustomError(401, 'Expired or invalid token');
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};