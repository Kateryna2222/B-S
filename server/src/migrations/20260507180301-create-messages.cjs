'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('messages', {
      id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
      chatId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'chats', key: 'id' },
        onDelete: 'CASCADE'
      },
      senderId: {
        type: Sequelize.INTEGER,
        allowNull: true, 
        references: { model: 'users', key: 'id' },
        onDelete: 'SET NULL'
      },
      content: { type: Sequelize.TEXT, allowNull: true },
      imageUrl: { type: Sequelize.STRING, allowNull: true },
      messageType: {
        type: Sequelize.ENUM('text', 'image', 'mixed'),
        defaultValue: 'text'
      },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('NOW()') },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('NOW()') }
    });

    await queryInterface.addIndex('messages', ['chatId']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('messages');
  }
};