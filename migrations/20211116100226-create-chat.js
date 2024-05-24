'use strict';
module.exports = {
    up: async(queryInterface, DataTypes) => {
        await queryInterface.createTable('chats', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            chat: {
                type: DataTypes.TEXT
            },
            user: {
                type: DataTypes.STRING
            },
            isRead: {
                type: DataTypes.STRING
            },
            deleted: {
                type: DataTypes.BOOLEAN
            },
            lastId: {
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
    down: async(queryInterface, DataTypes) => {
        await queryInterface.dropTable('chats');
    }
};