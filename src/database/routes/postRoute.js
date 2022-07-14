const express = require('express');
const { create } = require('../controller/postController');

const auth = require('../middlewares/auth');

const route = express.Router();

route.post('/', auth, create);

module.exports = route;