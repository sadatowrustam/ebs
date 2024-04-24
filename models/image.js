'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Image extends Model {

        static associate({ Products,Services }) {
            this.belongsTo(Products, { foreignKey: "productId", as: "images" })
            this.belongsTo(Services,{as:"service",foreignKey:"serviceId"})
        }
    }
    Image.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        productId: DataTypes.UUID,
        image: DataTypes.STRING
    }, {
        sequelize,
        tableName: "images",
        modelName: 'Images',
    });
    return Image;
};