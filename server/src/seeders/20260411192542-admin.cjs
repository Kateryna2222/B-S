'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('admin123', 5);

    await queryInterface.bulkInsert('users', [
      {
        email: 'admin@gmail.com',
        username: 'admin',
        password: hashedPassword,
        avatar: null,
        role: 'ADMIN',
        phoneNumber: '+380000000000',
        isActivated: true,
        activationLink: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', {
      email: 'admin@gmail.com'
    }, {});
  }
};