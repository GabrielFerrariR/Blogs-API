const express = require('express');
const login = require('./database/controller/login');
const { errorMiddleWare } = require('./database/middlewares/error');

// ...

const app = express();

app.use(express.json());

app.post('/login', login);
app.use(errorMiddleWare);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
