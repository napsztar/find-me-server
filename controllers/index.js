const models = require('../models');
const answers = require('./answers');
const users = require('./users');

module.exports = {
  // 비어있는 질문-대답 생성
  intro: (req, res) => {
    const result = {
      questionId: 1,
      questionContent: '내 삶의 목적은 무엇인가?',
      answerId: 1,
      questionAt: '2020-03-18T16:22:32.000Z',
    };
    res.status(200).json(result);
  },
};
