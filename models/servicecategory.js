'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Servicecategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Services}) {
      this.hasMany(Services,{as:"services",foreignKey:"servicecategoryId"})
    }
  }
  Servicecategory.init({
    name_tm: DataTypes.STRING,
    name_ru: DataTypes.STRING,
    name_en: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    tableName:"servicecategories",
    modelName: 'Servicecategory',
  });
  return Servicecategory;
};