const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const morgan = require('morgan');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');
const answerRouter = require('./routes/answers');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

app.use('/users', userRouter);
app.use('/answer', answerRouter);

app.listen(port, () => {
  console.log(`server start at ${port}`);
});
