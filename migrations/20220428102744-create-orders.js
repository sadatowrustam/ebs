'use strict';
module.exports = {
    async up(queryInterface, DataTypes) {
        await queryInterface.createTable('orders', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            total_price: {
                type: DataTypes.REAL
            },
            total_quantity: {
                type: DataTypes.INTEGER
            },
            user_name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "User name cannot be null",
                    },
                    notEmpty: {
                        msg: "User name cannot be empty",
                    },
                },
            },
            user_phone: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "User phone cannot be null",
                    },
                    notEmpty: {
                        msg: "User phone cannot be empty",
                    },
                },
            },
            payment_type: {
                type: DataTypes.STRING,
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Address cannot be null",
                    },
                    notEmpty: {
                        msg: "Address cannot be empty",
                    },
                },
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: "Status cannot be null",
                    },
                    notEmpty: {
                        msg: "Status cannot be empty",
                    },
                },
            },
            note: {
                type: DataTypes.TEXT
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
        await queryInterface.dropTable('orders');
    }
};