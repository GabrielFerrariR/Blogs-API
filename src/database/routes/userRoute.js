const express = require('express');
const { create, show, showUser } = require('../controller/userController');
const auth = require('../middlewares/auth');

const route = express.Router();

route.post('/', create)
  .get('/', auth, show)
  .get('/:id', auth, showUser);
module.exports = route;