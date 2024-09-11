'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Footer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Images}) {
      // define association here
      this.hasMany(Images, { foreignKey: "footerId", as: "images" })

    }
  }
  Footer.init({
    name_tm: DataTypes.STRING,
    name_en: DataTypes.STRING,
    name_ru: DataTypes.STRING,
    body_tm: DataTypes.TEXT,
    body_en: DataTypes.TEXT,
    body_ru: DataTypes.TEXT
  }, {
    sequelize,
    tableName:"footer",
    modelName: 'Footer',
  });
  return Footer;
};