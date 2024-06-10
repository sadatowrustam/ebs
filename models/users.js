'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init({
    city: DataTypes.STRING,
    companyName: DataTypes.STRING,
    email: DataTypes.STRING,
    jobTitle: DataTypes.STRING,
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    surname: DataTypes.STRING,
    text: DataTypes.TEXT,
    workPlace: DataTypes.STRING
  }, {
    sequelize,
    tableName:"users",
    modelName: 'Users',
  });
  return Users;
};