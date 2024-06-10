'use strict';
module.exports = {
    up: async(queryInterface, DataTypes) => {
        await queryInterface.createTable('orderproducts', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.INTEGER,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            orderId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            productId: {
                type: DataTypes.STRING,
            },
            serviceId: {
                type: DataTypes.STRING,
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
            type:{
                type:DataTypes.STRING,
            },
            sizeId:{
                type:DataTypes.STRING
            },
            colorId:{
                type:DataTypes.STRING
            },
            image:{
                type:DataTypes.STRING
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
        });
    },
    down: async(queryInterface, DataTypes) => {
        await queryInterface.dropTable('orderproducts');
    },
};