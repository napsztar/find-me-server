const models = require("../models");
const { answer, question, user } = models;
module.exports = {
  answer: async (req, res) => {
    const userId = req.params.userid;
      if (!userId) {
        return res.status(401).send("Unauthorized user.");
      } else {
        const result = await answer.findAll({
          include: [
            {
              model: question,
            },
            { model: user, where: { id: userId }, attributes: ["nickname"] },
          ],
        });
        res.status(200).json(result);
      }
  },
  question: async (req, res) => {
    const result = await question.findOne({
      where: { NthDay: 1 },
    });
      res.status(200).json(result);
  },
  signup: async (req, res) => {
    res.status(200).json("Signup is successed");
  },
  signin: async (req, res) => {
    res.status(200).json("Signin is successed");
  },
  signout: async (req, res) => {
    res.status(200).json("successfully signed out!");
  },
  update: async (req, res) => {
    const result = await user.findOne({
      where: { id: req.params.userid },
    });
    res
      .status(200)
      .send(`${result.nickname}'s password is successfully changed`);
  },
  delete: async (req, res) => {
    const result = await user.findOne({
      where: { id: req.params.userid }, 
    })
    res
      .status(200)
      .send(`${result.nickname}'s account is successfully deleted`);
  },
  dummy: async (req, res) => {
    const result = await user.findAll();
    res.json(result);
  }
};


