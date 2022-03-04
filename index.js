const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const { userRouter } = require('./controllers/userController');
const { loginRouter } = require('./controllers/loginController');
const { categoryRouter } = require('./controllers/categoryController');
const { postRouter } = require('./controllers/postController');
const ErrorGeneral = require('./middlewares/ErrorGeneral');

app.use(bodyParser.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/categories', categoryRouter);
app.use('/post', postRouter);

app.use(ErrorGeneral);
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

// test