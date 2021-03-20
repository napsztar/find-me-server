const models = require('../models');
const { answer, question, user } = models;
module.exports = {
  //--------------------------------------------------------------------------------
  answer: async (req, res) => {
    const userId = req.params.userid;
    if (!userId) {
      return res.status(401).send('Unauthorized user.');
    } else {
      const result = await answer.findAll({
        include: [
          {
            model: question,
          },
          { model: user, where: { id: userId }, attributes: ['nickname'] },
        ],
      });
      res.status(200).json(result);
    }
  },
  //--------------------------------------------------------------------------------
  question: async (req, res) => {
    const result = await question.findOne({
      where: { NthDay: 1 },
    });
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
      res.status(500).send('server is broken');
    }
  },
  //--------------------------------------------------------------------------------
  signin: async (req, res) => {
    res.status(200).json('Signin is successed');
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
      id: PK,
      password: 'password',
      email: 'email',
      nickname: 'nickname',
    });
  },
};
