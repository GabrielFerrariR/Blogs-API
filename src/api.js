const express = require('express');
const login = require('./database/controller/login');
const { errorMiddleWare } = require('./database/middlewares/error');
const userRoute = require('./database/routes/userRoute');
const categoriesRoute = require('./database/routes/categoriesRoute');
const postRoute = require('./database/routes/postRoute');

// ...

const app = express();

app.use(express.json());

app.post('/login', login);
app.use('/user', userRoute);
app.use('/categories', categoriesRoute);
app.use('/post', postRoute);
app.use(errorMiddleWare);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
