'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tokens', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      refreshToken: { type: Sequelize.STRING, allowNull: false},
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE'
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tokens');
  }
};