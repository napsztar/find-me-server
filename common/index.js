const models = require('../models');
const { user, answer, question } = models;

module.exports = {
  getUserIdByToken: async accessTokenData => {
    const findUser = await user.findOne({
      where: { email: accessTokenData.email },
    });
    return findUser.dataValues.id;
  },
};
