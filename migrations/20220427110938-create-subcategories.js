'use strict';
module.exports = {
    async up(queryInterface, DataTypes) {
        await queryInterface.createTable('subcategories', {
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
            categoryId: {
                type: DataTypes.UUID
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
        await queryInterface.dropTable('subcategories');
    }
};