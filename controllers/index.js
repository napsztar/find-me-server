const models = require('../models');
const { isAuthorized } = require('./tokenFunctions');
const { answer, question } = models;
require('dotenv').config();
const moment = require('moment');
moment().format('YYYY-MM-DD');
module.exports = {
  // 비어있는 질문-대답 생성
  intro: async (req, res) => {
    const accessTokenData = isAuthorized(req);

    if (!accessTokenData) {
      return res.json({ data: null, message: 'invalid access token' });
    }

    // 생성 될 질문번호
    const questionIndex =
      (await answer.max('questionId', {
        where: { userId: accessTokenData.id },
      })) + 1;

    // 빈 질문지 생성
    await answer.create({
      content: '',
      questiondAt: moment().toDate(),
      userId: accessTokenData.id,
      questionId: questionIndex,
    });

    // 쿼리로 원하는 속성 찾아 response
    await answer
      .findOne({
        include: [{ model: question, where: { id: questionIndex } }],
        where: { userId: accessTokenData.id },
        attributes: ['id', 'questionAt'],
      })
      .then(data => {
        res.status(200).json(data);
      });

    // 이전 샘플 데이터
    const result = {
      questionId: 1,
      questionContent: '내 삶의 목적은 무엇인가?',
      answerId: 1,
      questionAt: '2020-03-18T16:22:32.000Z',
    };
  },
};
