module.exports = {
  //질문 list 출력
  answer: async (req, res) => {
    const result = [
      {
        answerId: 1,
        questionContent: '내 삶의 목적은 무엇인가?',
      },
      {
        answerId: 2,
        questionContent: '사람은 변할 수 있을까?',
      },
      {
        answerId: 3,
        questionContent: '최근에 읽고 있는 글이나 책이 있다면?',
      },
    ];
    res.status(200).json(result);
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
