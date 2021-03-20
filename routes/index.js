const express = require('express');
const router = express.Router();
const controller = require('../controllers');

router.get('/', (req, res) => {
  res.status(200).send('Hello world!');
});

router.post('/intro', controller.intro);

module.exports = router;
