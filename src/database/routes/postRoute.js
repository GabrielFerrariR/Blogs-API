const express = require('express');
const { create, show } = require('../controller/postController');

const auth = require('../middlewares/auth');

const route = express.Router();

route.post('/', auth, create)
.get('/', auth, show);

module.exports = route;