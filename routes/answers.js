const express = require('express');
const router = express.Router();
const answerController = require('../controllers/answers');

router.post('/', answerController.answer);
router.post('/add', answerController.addAnswer);
router.post('/read', answerController.readAnswer);
router.post('/edit', answerController.editAnswer);

module.exports = router;
