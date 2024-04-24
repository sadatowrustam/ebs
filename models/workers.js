'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Workers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Workers.init({
    name: DataTypes.STRING,
    job: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    tableName:"workers",
    modelName: 'Workers',
  });
  return Workers;
};