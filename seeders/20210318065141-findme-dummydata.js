'use strict';

// ‘'yyyy-MM-dd hh:mm:ss’

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('questions', [
      {
        id: 1,
        content: '내 삶의 목적은 무엇인가?',
        NthDay: 1,
        createdAt: "2020-03-18 16:22:32",
        updatedAt: "2020-03-18 16:22:32",
      },
      {
        id: 2,
        content: '사람은 변할 수 있을까?',
        NthDay: 2,
        createdAt: "2020-03-18 16:22:32",
        updatedAt: "2020-03-18 16:22:32",
      },
      {
        id: 3,
        content: '최근에 읽고 있는 글이나 책이 있다면?',
        NthDay: 3,
        createdAt: "2020-03-18 16:22:32",
        updatedAt: "2020-03-18 16:22:32",
      },
      {
        id: 4,
        content: '최근 내 삶에서 가장 결별하고 싶은 것은?',
        NthDay: 4,
        createdAt: "2020-03-18 16:22:32",
        updatedAt: "2020-03-18 16:22:32",
      },
      {
        id: 5,
        content: '가장 최근에 방문한 식당은? 무엇을 먹었는가?',
        NthDay: 5,
        createdAt: "2020-03-18 16:22:32",
        updatedAt: "2020-03-18 16:22:32",
      },
    ]);
    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        nickname: 'carrot',
        email: 'carrot@carrot.com',
        password: 'carrot',
        createdAt: "2020-03-18 16:22:32",
        updatedAt: "2020-03-18 16:22:32",
      },
      {
        id: 2,
        nickname: 'today',
        email: 'today@today.com',
        password: 'today',
        createdAt: "2020-03-18 16:22:32",
        updatedAt: "2020-03-18 16:22:32",
      },
      {
        id: 3,
        nickname: 'todayCarrot',
        email: 'todayCarrot@todayCarrot.com',
        password: 'todayCarrot',
        createdAt: "2020-03-18 16:22:32",
        updatedAt: "2020-03-18 16:22:32",
      },
    ]);
    await queryInterface.bulkInsert('answers', [
      {
        id: 1,
        content: '모르겠다',
        userId: 1,
        questionId: 1,
        updatedAt: "2020-03-18 16:22:32",
        questionAt: "2020-03-18 16:22:32",
        createdAt: "2020-03-18 16:22:32",
      },
      {
        id: 2,
        content: '그럼그럼',
        userId: 1,
        questionId: 2,
        updatedAt: "2020-03-18 16:22:32",
        questionAt: "2020-03-18 16:22:32",
        createdAt: "2020-03-18 16:22:32",
      },
      {
        id: 3,
        content: 'node.js 교과서',
        userId: 1,
        questionId: 3,
        updatedAt: "2020-03-18 16:22:32",
        questionAt: "2020-03-18 16:22:32",
        createdAt: "2020-03-18 16:22:32",
      },
      {
        id: 4,
        content: '개린이 벗어나고 개청년되고싶어',
        userId: 2,
        questionId: 4,
        updatedAt: "2020-03-18 16:22:32",
        questionAt: "2020-03-18 16:22:32",
        createdAt: "2020-03-18 16:22:32",
      },
      {
        id: 5,
        content: 'No Beer No Life, 브릭파스타 ',
        userId: 2,
        questionId: 5,
        updatedAt: "2020-03-18 16:22:32",
        questionAt: "2020-03-18 16:22:32",
        createdAt: "2020-03-18 16:22:32",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('questions', null, {});
    await queryInterface.bulkDelete('answers', null, {});
    await queryInterface.bulkDelete('users', null, {});
  },
};
