'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Aboutus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Aboutus.init({
    name_tm: DataTypes.STRING,
    name_en: DataTypes.STRING,
    name_ru: DataTypes.STRING,
    body_tm: DataTypes.TEXT,
    body_en: DataTypes.TEXT,
    body_ru: DataTypes.TEXT,
    image: DataTypes.STRING
  }, {
    sequelize,
    tableName:"aboutus",
    modelName: 'Aboutus',
  });
  return Aboutus;
};