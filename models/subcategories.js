'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Subcategories extends Model {

        static associate({ Categories, Products }) {
            this.belongsTo(Categories, { foreignKey: "categoryId", as: "category" })
            // this.hasMany(Products, { foreignKey: "subcategoryId", as: "products" })
        }
    }
    Subcategories.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        name_tm: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name_ru: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name_en: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // categoryId: DataTypes.UUID
    }, {
        sequelize,
        tableName: "subcategories",
        modelName: 'Subcategories',
    });
    return Subcategories;
};