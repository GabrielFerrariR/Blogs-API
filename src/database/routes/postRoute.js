const express = require('express');
const { create, show, getById } = require('../controller/postController');

const auth = require('../middlewares/auth');

const route = express.Router();

route.post('/', auth, create)
  .get('/', auth, show)
  .get('/:id', auth, getById);

module.exports = route;