'use strict';
const Sequelize = require('sequelize');
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      answer.belongsTo(models.user, { foreignKey: 'userId' });
      answer.belongsTo(models.question, { foreignKey: 'questionId' });
    }
  }
  answer.init(
    {
      content: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      questionId: DataTypes.INTEGER,
      questionAt: { type: DataTypes.DATE, defaultValue: new Date() },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'answer',
      timestamps: false,
      dialectOptions: {
        dateStrings: true,
        typeCast: true,
      },
    },
  );
  return answer;
};
