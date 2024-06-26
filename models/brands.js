'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Brands extends Model {
        static associate({ Categories, Products }) {
            this.belongsToMany(Categories, {
                through: 'Categoriesbrands',
                foreignKey: 'brandId',
                as: 'brand_categories',
            });
            this.hasMany(Products, { foreignKey: "brandId", as: "brand_products" })
        }
    }
    Brands.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Brand name cannot be null",
                },
                notEmpty: {
                    msg: "Brand name cannot be empty",
                },
            },
        },
        image: DataTypes.STRING,
        body_tm:DataTypes.TEXT,
        body_ru:DataTypes.TEXT,
        body_en:DataTypes.TEXT,
    }, {
        sequelize,
        tableName: "brands",
        modelName: 'Brands',
    });
    return Brands;
};