'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clients extends Model {
    static associate(models) {
      // define association here
    }
  }
  Clients.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    status:DataTypes.STRING
  }, {
    sequelize,
    tableName:"clients",
    modelName: 'Clients',
  });
  return Clients;
};