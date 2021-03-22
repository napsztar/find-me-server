const models = require('../../models');
const { user, question, answer } = models;
const { isAuthorized } = require('../tokenFunctions');
module.exports = {
  //질문 list 출력
  answer: async (req, res) => {
    //사용자 토큰 확인 및 userId 접근
    const accessTokenData = isAuthorized(req);

    // DB에서 해당 사용자의 모든 질문 가져오기
    const queryData = await answer.findAll({
      include: [{ model: question, attributes: ['content'] }],
      where: { userId: accessTokenData.id },
      attributes: ['id'],
    });

    // Client가 요구하는 data format으로 변경
    const reformatResult = queryData.map(function (data) {
      return {
        answerId: data.id,
        questionContent: data.question.content,
      };
    });

    res.status(200).json(reformatResult);
  },

  //질문에 대한 대답 작성 (add)
  addAnswer: (req, res) => {
    res.status(200).json({ message: 'Success' });
  },

  //질문-대답 상세페이지 (read/detail)
  readAnswer: (req, res) => {
    const result = {
      questionId: 1,
      questionContent: '내 삶의 목적은 무엇인가?',
      answerId: 1,
      answerContent: '내 삶의 목적은 자아실현에 있다.',
      createdAt: '2020-03-18T16:22:32.000',
      updatedAt: '2020-03-18T16:22:32.000',
      questionAt: '2020-03-19T16:22:32.000',
    };
    res.status(200).json(result);
  },

  //대답 수정 응답 (edit)
  editAnswer: (req, res) => {
    res.status(200).json({
      message: 'answer is successfully updated',
    });
  },
};
