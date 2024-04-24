'use strict';
module.exports = {
    async up(queryInterface, DataTypes) {
        await queryInterface.createTable('images', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            productId: {
                type: DataTypes.UUID
            },
            serviceId:{
                type:DataTypes.INTEGER
            },
            image: {
                type: DataTypes.STRING
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE
            }
        });
    },
    async down(queryInterface, DataTypes) {
        await queryInterface.dropTable('images');
    }
};