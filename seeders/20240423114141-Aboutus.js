'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'aboutus', [{
          name_tm: 'fuhifhwef',
          name_ru: 'fjoi34fjio43f',
          name_en: 'kjmciojfio3',
          body_tm: 'fuhifhwhuirviurhvuierhuviehriuvehruvieef',
          body_ru: 'fjoi34fjio43fc4oicvjiovjiorjv4i3jvi4jv3o4ivj43iov',
          body_en: 'kjmciojfio3fj43jfoi34rgjf48ij43iovhiofehgfvuduierhvuih',
          createdAt: Sequelize.fn('now'),
          updatedAt: Sequelize.fn('now'),
      }, ], {}
  );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
