'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sizes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Products,Categories}) {
      this.belongsToMany(Products,{as:"products",through:"Productsizes",foreignKey:"sizeId"})
      this.belongsTo(Categories,{as:"category",foreignKey:"categoryId"})
    }
  }
  Sizes.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4
    },
    size: DataTypes.STRING,
    categoryId:{
      type:DataTypes.UUID
    },
  }, {
    sequelize,
    tableName:"sizes",
    modelName: 'Sizes',
  });
  return Sizes;
};