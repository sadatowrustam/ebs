'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('services', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name_tm: {
        type: Sequelize.STRING
      },
      name_ru: {
        type: Sequelize.STRING
      },
      name_en: {
        type: Sequelize.STRING
      },
      body_tm: {
        type: Sequelize.TEXT
      },
      body_ru: {
        type: Sequelize.TEXT
      },
      body_en: {
        type: Sequelize.TEXT
      },
      rating: {
        type: Sequelize.REAL,
        defaultValue: 0
      },
      showFooter:{
        type:Sequelize.BOOLEAN
      },
      rating_count: {
          type: Sequelize.INTEGER,
          defaultValue: 0
      },
      options: {
        type: Sequelize.TEXT
      },
      servicecategoryId:{
        type:Sequelize.INTEGER
      },
      price:{
        type:Sequelize.REAL
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('services');
  }
};