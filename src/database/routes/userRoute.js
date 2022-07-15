const express = require('express');
const { create, show, showUser, remove } = require('../controller/userController');
const auth = require('../middlewares/auth');

const route = express.Router();

route.post('/', create)
  .delete('/me', auth, remove)
  .get('/', auth, show)
  .get('/:id', auth, showUser);
module.exports = route;