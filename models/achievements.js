'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Achievements extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Achievements.init({
    number: DataTypes.STRING,
    title_tm: DataTypes.STRING,
    title_en: DataTypes.STRING,
    title_ru: DataTypes.STRING,
    body_tm: DataTypes.TEXT,
    body_ru: DataTypes.TEXT,
    body_en: DataTypes.TEXT,
    image:DataTypes.STRING
  }, {
    sequelize,
    tableName:"achievements",
    modelName: 'Achievements',
  });
  return Achievements;
};