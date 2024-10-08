'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Images}) {
      // define association here
      this.hasMany(Images,{as:"images",foreignKey:"newsId"})
    }
  }
  News.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4
    },
    header_tm: DataTypes.STRING,
    header_ru: DataTypes.STRING,
    header_en: DataTypes.STRING,
    body_tm: DataTypes.TEXT,
    body_ru: DataTypes.TEXT,
    body_en: DataTypes.TEXT,
    image: DataTypes.STRING
  }, {
    sequelize,
    tableName:"news",
    modelName: 'News',
  });
  return News;
};