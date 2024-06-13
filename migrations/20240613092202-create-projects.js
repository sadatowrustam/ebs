'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Projects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name_tm: {
        type: Sequelize.STRING
      },
      name_en: {
        type: Sequelize.STRING
      },
      name_ru: {
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
    await queryInterface.dropTable('Projects');
  }
};