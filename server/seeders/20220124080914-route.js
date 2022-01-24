'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('routes', [
      {
        method: 'get',
        path: 'user'
      },
      {
        method: 'post',
        path: 'user'
      },
      {
        method: 'patch',
        path: 'user'
      },
      {
        method: 'delete',
        path: 'user'
      },
      {
        method: 'patch',
        path: 'password'
      },
    ], {});
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
