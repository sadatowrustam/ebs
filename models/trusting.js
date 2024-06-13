'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trusting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Images}) {
      // define association here
      this.hasMany(Images, { foreignKey: "trustingId", as: "images" })

    }
  }
  Trusting.init({
    name: DataTypes.STRING,
    body_tm: DataTypes.TEXT,
    body_ru: DataTypes.TEXT,
    body_en: DataTypes.TEXT
  }, {
    sequelize,
    tableName:"trusting",
    modelName: 'Trusting',
  });
  return Trusting;
};