'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Orderproducts extends Model {
        static associate({ Orders }) {
            this.belongsTo(Orders, {
                foreignKey: 'orderId',
                as: 'order',
            });
        }
    }
    Orderproducts.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        orderId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        productId: {
            type: DataTypes.STRING,
        },
        serviceId:{
            type:DataTypes.INTEGER
        },
        quantity: {
            type: DataTypes.REAL,
            allowNull: false,
        },
        price: {
            type: DataTypes.REAL,
            allowNull: false,
        },
        total_price: {
            type: DataTypes.REAL,
            allowNull: false,
        },
        sizeId:{
            type:DataTypes.STRING
        },
        colorId:{
            type:DataTypes.STRING
        },
        type:{
            type:DataTypes.STRING
        }
    }, {
        sequelize,
        tableName: 'orderproducts',
        modelName: 'Orderproducts',
    });
    return Orderproducts;
};