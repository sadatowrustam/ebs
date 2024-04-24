'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('achievements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      number: {
        type: Sequelize.STRING
      },
      title_tm: {
        type: Sequelize.STRING
      },
      title_en: {
        type: Sequelize.STRING
      },
      title_ru: {
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
      image:{
        type:Sequelize.STRING
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('achievements');
  }
};