'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mails extends Model {
    static associate(models) {
    }
  }
  Mails.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4
    },
    email: DataTypes.STRING,
    text:DataTypes.TEXT,
    name:DataTypes.STRING,
    phone:DataTypes.STRING
  }, {
    sequelize,
    tableName:"mails",
    modelName: 'Mails',
  });
  return Mails;
};