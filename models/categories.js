'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Categories extends Model {
        static associate({ Subcategories, Products, Brands,Sizes }) {
            this.hasMany(Subcategories, { foreignKey: "categoryId", as: "subcategories" })
            this.hasMany(Products, { foreignKey: "categoryId", as: "products" })
            this.belongsToMany(Brands, {
                through: 'Categoriesbrands',
                foreignKey: 'categoryId',
                as: 'category_brands',
            });
            this.hasMany(Sizes,{as:"sizes",foreignKey:"categoryId"})   
        }

    }
    Categories.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        name_tm: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Category name cannot be null",
                },
                notEmpty: {
                    msg: "Category name cannot be empty",
                },
            },
        },
        name_ru: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Category name cannot be null",
                },
                notEmpty: {
                    msg: "Category name cannot be empty",
                },
            },
        },
        name_en: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Category name cannot be null",
                },
                notEmpty: {
                    msg: "Category name cannot be empty",
                },
            },
        },
        image:DataTypes.STRING,
        order:DataTypes.INTEGER
    }, {
        sequelize,
        tableName: "categories",
        modelName: 'Categories',
    });
    return Categories;
};