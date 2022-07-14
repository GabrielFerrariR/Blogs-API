const express = require('express');
const { create } = require('../controller/categoriesController');

const auth = require('../middlewares/auth');

const route = express.Router();

route.post('/', auth, create);
module.exports = route;