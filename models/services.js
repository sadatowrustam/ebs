'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Services extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Servicecategory,Images}) {
      this.belongsTo(Servicecategory,{as:"servicecategory",foreignKey:"servicecategoryId"})
      this.hasMany(Images,{as:"images",foreignKey:"serviceId"})
    }
  }
  Services.init({
    name_tm: DataTypes.STRING,
    name_ru: DataTypes.STRING,
    name_en: DataTypes.STRING,
    body_tm: {
      type: DataTypes.TEXT
    },
    body_ru: {
      type: DataTypes.TEXT
    },
    body_en: {
      type: DataTypes.TEXT
    },
    rating: {
      type: DataTypes.REAL,
      defaultValue: 0
    },
    rating_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    options: {
      type:DataTypes.TEXT,
      set(value){
        this.setDataValue("options",JSON.stringify(value))
      },
      get(){
        return JSON.parse(this.getDataValue("options"))
      }
    },
    price:{
      type:DataTypes.REAL
    },
    servicecategoryId:DataTypes.INTEGER
  }, {
    sequelize,
    tableName:"services",
    modelName: 'Services',
  });
  return Services;
};