'use strict';

module.exports = {
    async up(queryInterface, DataTypes) {
        await queryInterface.createTable('products', {
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
                        msg: "Product name cannot be null",
                    },
                    notEmpty: {
                        msg: "Product name cannot be empty",
                    },
                },
            },
            name_ru: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Product name cannot be null",
                    },
                    notEmpty: {
                        msg: "Product name cannot be empty",
                    },
                },
            },
            name_en: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Product name cannot be null",
                    },
                    notEmpty: {
                        msg: "Product name cannot be empty",
                    },
                },
            },
            body_tm: {
                type: DataTypes.TEXT,
            },
            body_ru: {
                type: DataTypes.TEXT,
            },
            body_en: {
                type: DataTypes.TEXT,
            },
            price: {
                type: DataTypes.REAL
            },
            price_old: {
                type: DataTypes.REAL
            },
            discount: {
                type: DataTypes.REAL
            },
            product_code: {
                type: DataTypes.TEXT,
                validate: {
                    notNull: {
                        msg: "Product code cannot be null",
                    },
                    notEmpty: {
                        msg: "Product code cannot be empty",
                    },
                },
            },
            rating: {
                type: DataTypes.REAL,
                defaultValue: 0
            },
            rating_count: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            isActive: {
                type: DataTypes.BOOLEAN
            },
            isNew: {
                type: DataTypes.BOOLEAN,
            },
            isAction: {
                type: DataTypes.BOOLEAN
            },
            isGift: {
                type: DataTypes.BOOLEAN
            },
            is_new_expire: {
                type: DataTypes.BIGINT
            },
            categoryId: {
                type: DataTypes.UUID,
            },
            subcategoryId: {
                type: DataTypes.UUID
            },
            brandId: {
                type: DataTypes.UUID
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            sizeIds:{
                type:DataTypes.ARRAY(DataTypes.STRING)
            },
            colorIds:{
                type:DataTypes.ARRAY(DataTypes.STRING)
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE
            }
        });
    },
    async down(queryInterface, DataTypes) {
        await queryInterface.dropTable('products');
    }
};