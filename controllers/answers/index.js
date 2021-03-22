const models = require('../../models');
const { user, question, answer } = models;
const { isAuthorized } = require('../tokenFunctions');
module.exports = {
  //질문 list 출력
  answer: async (req, res) => {
    //사용자 토큰 확인 및 userId 접근
    const accessTokenData = isAuthorized(req);
    if (!accessTokenData) {
      return res.json({ data: null, message: 'invalid access token' });
    }
    // DB에서 해당 사용자의 모든 질문 가져오기
    const queryData = await answer.findAll({
      include: [{ model: question, attributes: ['content'] }],
      where: { userId: accessTokenData.id },
      attributes: ['id'],
    });

    // Client가 요구하는 data format으로 변경
    const reformatData = queryData.map(function (data) {
      return {
        answerId: data.id,
        questionContent: data.question.content,
      };
    });

    res.status(200).json(reformatData);
  },

  //질문에 대한 대답 작성 (add)
  addAnswer: (req, res) => {
    res.status(200).json({ message: 'Success' });
  },

  //질문-대답 상세페이지 (read/detail)
  readAnswer: async (req, res) => {
    //사용자 토큰 확인 및 userId 접근
    const accessTokenData = isAuthorized(req);
    if (!accessTokenData) {
      return res.json({ data: null, message: 'invalid access token' });
    }

    // 특정 answerId에 해당하는 answer&question 출력
    const answerId = req.body.answerId;

    const queryData = await answer.findOne({
      include: [question],
      where: { id: answerId },
      attributes: ['id', 'content', 'questionAt', 'createdAt', 'updatedAt'],
    });

    // Client에서 원하는 데이터 형식으로 변환
    const reformatData = {
      questionId: queryData.question.id,
      questionContent: queryData.question.content,
      answerId: queryData.id,
      answerContent: queryData.content,
      createdAt: queryData.createdAt,
      updatedAt: queryData.updatedAt,
      questionAt: queryData.questionAt,
    };
    res.status(200).json(reformatData);
  },

  //대답 수정 응답 (edit)
  editAnswer: (req, res) => {
    res.status(200).json({
      message: 'answer is successfully updated',
    });
  },
};
