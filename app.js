const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const morgan = require('morgan');
const controller = require('./controllers');
const router = require('./Routes');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 홈
app.get('/', (req, res) => {
  res.status(200).send('Hello world!');
});

app.use('/users', router);
app.post('/answer', controller.answer);
app.post('/answer/add', controller.addAnswer);
app.post('/answer/read', controller.readAnswer);
app.post('/answer/edit', controller.editAnswer);
app.post('/intro', controller.intro);

app.listen(port, () => {
  console.log(`server start at ${port}`);
});
