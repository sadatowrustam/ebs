'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Image extends Model {
        static associate({ Products,News,Projects,OurWorks,Trusting,Footer }) {
            this.belongsTo(Products, { foreignKey: "productId", as: "images" })
            // this.belongsTo(Services, { foreignKey: "productId", as: "images" })
            this.belongsTo(Projects,{as:"project",foreignKey:"projectId"})
            this.belongsTo(OurWorks,{as:"ourwork",foreignKey:"ourworkId"})
            this.belongsTo(Trusting,{as:"trusting",foreignKey:"trustingId"})
            this.belongsTo(Footer,{as:"footer ",foreignKey:"footerId"})
            this.belongsTo(News,{as:"news",foreignKey:"newsId"})

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
        // serviceId: DataTypes.UUID,
        projectId: DataTypes.INTEGER,
        ourworkId: DataTypes.INTEGER,
        trustingId: DataTypes.INTEGER,
        footerId: DataTypes.INTEGER,
        newsId:DataTypes.UUID,
        image: DataTypes.STRING
    }, {
        sequelize,
        tableName: "images",
        modelName: 'Images',
    });
    return Image;
};