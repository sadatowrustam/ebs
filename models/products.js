'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Products extends Model {
        static associate({ Categories, Images,Sizes,Colors,Subcategories,Brands }) {
            this.belongsTo(Categories, { foreignKey: "categoryId", as: "category" })
            this.belongsTo(Subcategories, { foreignKey: "subcategoryId", as: "subcategory" })
            this.belongsTo(Brands, { foreignKey: "brandId", as: "brand" })
            this.hasMany(Images, { foreignKey: "productId", as: "images" })
            this.belongsToMany(Sizes,{as:"sizes",through:"Productsizes",foreignKey:"productId"})
            this.belongsToMany(Colors,{as:"colors",through:"Productcolor",foreignKey:"productId"})
        }
    }
    Products.init({
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
                    msg: "Product cannot be null",
                },
                notEmpty: {
                    msg: "Product cannot be empty",
                },
            },
        },
        name_ru: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Product cannot be null",
                },
                notEmpty: {
                    msg: "Product cannot be empty",
                },
            },
        },
        name_en: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Product cannot be null",
                },
                notEmpty: {
                    msg: "Product cannot be empty",
                },
            },
        },
        body_tm: {
            type: DataTypes.STRING,
        },
        body_ru: {
            type: DataTypes.STRING,
        },
        body_en: {
            type: DataTypes.STRING,
        },
        product_code: {
            type: DataTypes.STRING,
        },
        price: DataTypes.REAL,
        price_old: DataTypes.REAL,
        discount: DataTypes.REAL,
        isActive: DataTypes.BOOLEAN,
        isNew: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        rating: {
            type: DataTypes.REAL,
            defaultValue: 0
        },
        rating_count: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        is_new_expire: DataTypes.BIGINT,
        categoryId: DataTypes.UUID,
        sizeIds:DataTypes.ARRAY(DataTypes.STRING),
        colorIds:DataTypes.ARRAY(DataTypes.STRING),
        subcategoryId: DataTypes.UUID,
        brandId: DataTypes.UUID,
    }, {
        sequelize,
        tableName: "products",
        modelName: 'Products',
    });
    return Products;
};