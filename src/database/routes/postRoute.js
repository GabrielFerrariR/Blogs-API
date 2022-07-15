const express = require('express');
const { create, show, getById, update, remove, showByQ } = require('../controller/postController');

const auth = require('../middlewares/auth');

const route = express.Router();

route.post('/', auth, create)
  .get('/', auth, show).get('/search', auth, showByQ)
  .get('/:id', auth, getById)
  .put('/:id', auth, update)
  .delete('/:id', auth, remove);

module.exports = route;