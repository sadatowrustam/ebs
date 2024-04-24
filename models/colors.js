'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Colors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Products}) {
      this.belongsToMany(Products,{through:"Productcolor",as:"products",foreignKey:"colorId"})
    }
  }
  Colors.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4
    },
    hex: DataTypes.STRING
  }, {
    sequelize,
    tableName:"colors",
    modelName: 'Colors',
  });
  return Colors;
};