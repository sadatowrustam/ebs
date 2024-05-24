'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Chat extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Chat.init({
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        chat: {
            type:DataTypes.TEXT,
            get() {
                const data=this.getDataValue("chat")
                console.log(data)
                if(data==null || data=="null") {
                    console.log(28)
                    return []
                }
                else return JSON.parse(data)
              },
            set(value) {
                console.log(value)
                if(value!=null){
                    this.setDataValue("chat",JSON.stringify(value))
                }else this.setDataValue("chat",null)
              }
        },
        user: DataTypes.STRING,
        isRead: DataTypes.STRING,
        lastId: DataTypes.STRING,
    }, {
        sequelize,
        tableName: "chats",
        modelName: 'Chat',
    });
    return Chat;
};