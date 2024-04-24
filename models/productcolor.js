'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Productcolor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Productcolor.init({
    productId: DataTypes.UUID,
    colorId: DataTypes.UUID
  }, {
    sequelize,
    tableName:"productcolors",
    modelName: 'Productcolor',
  });
  return Productcolor;
};