const models = require('../models');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const { answer, question, user } = models;
module.exports = {
  //--------------------------------------------------------------------------------
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
  //--------------------------------------------------------------------------------
  addAnswer: (req, res) => {
    res.status(200).json({ message: 'Success' });
  },
  //--------------------------------------------------------------------------------
  readAnswer: (req, res) => {
    const result = {
      questionId: 1,
      questionContent: '내 삶의 목적은 무엇인가?',
      answerId: 1,
      createdAt: '2020-03-18T16:22:32.000',
      updatedAt: '2020-03-18T16:22:32.000',
      questionedAt: '2020-03-19T16:22:32.000',
    };
    res.status(200).json(result);
  },
  //--------------------------------------------------------------------------------
  editAnswer: (req, res) => {
    res.status(200).json({
      message: 'answer is successfully updated',
    });
  },
  //--------------------------------------------------------------------------------

  question: (req, res) => {
    const result = {
      questionId: 1,
      questionContent: '내 삶의 목적은 무엇인가?',
      answerId: 1,
      questionAt: '2020-03-18T16:22:32.000Z',
    };
    res.status(200).json(result);
  },
  //--------------------------------------------------------------------------------
  signup: async (req, res) => {
    try {
      const emailCheck = await user.findOne({
        where: { email: req.body.email },
      });
      if (emailCheck) {
        return res.status(409).send('This email already exists');
      }

      await user.create({
        email: req.body.email,
        password: req.body.password,
        nickname: req.body.nickname,
      });

      res.status(200).json('Signup is successed');
    } catch (err) {
      res.status(500).send('Server is broken');
    }
  },
  //--------------------------------------------------------------------------------
  signin: async (req, res) => {
    try {
      const userInfo = await user.findOne({
        where: { email: req.body.email, password: req.body.password },
      });

      if (!userInfo) {
        res.status(401).send({ message: 'Invalid user or Wrong password' });
      } else {
        const ACCESS_SECRET = process.env.ACCESS_SECRET;
        const accessToken = jwt.sign(
          {
            id: userInfo.id,
            nickname: userInfo.nickname,
            email: userInfo.email,
            createdAt: userInfo.createdAt,
            updatedAt: userInfo.updatedAt,
          },
          ACCESS_SECRET,
          { expiresIn: '24h' },
        );

        res.status(200).json({
          data: { accessToken: accessToken },
          message: 'Signin is successed',
        });
      }
    } catch (err) {
      res.status(500).json({ message: 'Server is broken' });
    }
  },
  //--------------------------------------------------------------------------------
  signout: async (req, res) => {
    res.status(200).json('successfully signed out!');
  },
  //--------------------------------------------------------------------------------
  update: async (req, res) => {
    const result = await user.findOne({
      where: { id: req.params.userid },
    });
    res
      .status(200)
      .send(`${result.nickname}'s password is successfully changed`);
  },
  //--------------------------------------------------------------------------------
  delete: async (req, res) => {
    const result = await user.findOne({
      where: { id: req.params.userid },
    });
    res
      .status(200)
      .send(`${result.nickname}'s account is successfully deleted`);
  },
  //--------------------------------------------------------------------------------
  userinfo: async (req, res) => {
    res.status(200).json({
      id: 'PK',
      password: 'password',
      email: 'email',
      nickname: 'nickname',
    });
  },
};
