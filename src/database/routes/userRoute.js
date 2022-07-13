const express = require('express');
const { create, show } = require('../controller/userController');
const auth = require('../middlewares/auth');

const route = express.Router();

route.post('/', create);
route.get('/', auth, show);
module.exports = route;