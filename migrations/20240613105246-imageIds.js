'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("images","trustingId",{
      type:Sequelize.INTEGER,
    })
    await queryInterface.addColumn("images","ourworkId",{
      type:Sequelize.INTEGER,
    })
    await queryInterface.addColumn("images","projectId",{
      type:Sequelize.INTEGER,
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
