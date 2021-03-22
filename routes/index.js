const express = require('express');
const router = express.Router();
const controller = require('../controllers');
const google = require('../controllers/google');

router.get('/', (req, res) => {
  res.status(200).send('Hello world!');
});

router.post('/intro', controller.intro);
router.post('/callback', google);

module.exports = router;
