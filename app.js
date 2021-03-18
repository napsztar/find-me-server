const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const morgan = require('morgan');

app.use(cors());
let func = function () {
  let foo = 'abc11';
  return foo;
};

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(port, () => {
  console.log(`server start at ${port}`);
});
