'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Services,Products}) {
      this.belongsTo(Products,{as:"product",foreignKey:"productId"})
      this.belongsTo(Services,{as:"service",foreignKey:"serviceId"})
    }
  }
  Comments.init({
    rating: DataTypes.INTEGER,
    comment: DataTypes.TEXT,
    email: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    answer:DataTypes.TEXT,
    name: DataTypes.STRING,
    productId:DataTypes.UUID,
    serviceId:DataTypes.INTEGER
  }, {
    sequelize,
    tableName:"comments",
    modelName: 'Comments',
  });
  return Comments;
};