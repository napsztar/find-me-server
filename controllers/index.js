const models = require('../models');
const { isAuthorized } = require('./tokenFunctions');
const { getUserIdByToken } = require('../common');
const { answer, question } = models;

const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');
moment().format();
moment().format('YYYY-MM-DD');
module.exports = {
  // 비어있는 질문-대답 생성
  intro: async (req, res) => {
    const accessTokenData = isAuthorized(req);
    if (!accessTokenData) {
      return res.json({ data: null, message: 'invalid access token' });
    }

    const requestUserId = await getUserIdByToken(accessTokenData);
    // 생성 될 질문번호
    const questionIndex =
      (await answer.max('questionId', {
        where: { userId: requestUserId },
      })) + 1 || 1;

    // 빈 질문지 생성
    await answer.create({
      content: '',
      questionAt: moment().toDate(),
      userId: requestUserId,
      questionId: questionIndex,
    });

    // 쿼리로 원하는 속성 찾아 response
    await answer
      .findOne({
        include: [{ model: question, where: { id: questionIndex } }],
        where: { userId: requestUserId },
        attributes: ['id', 'questionAt'],
      })
      .then(data => {
        res.status(200).json({
          questionId: data.dataValues.question.dataValues.id,
          questionContent: data.dataValues.question.dataValues.content,
          answerId: data.dataValues.id,
          questionAt: data.dataValues.questionAt,
        });
      });
  },
};
