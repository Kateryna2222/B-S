'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
      deliveryMethod: {
        type: Sequelize.ENUM('nova_poshta', 'ukrposhta'),
        allowNull: false,
        defaultValue: 'nova_poshta'
      },
      priceAtPurchase: {type: Sequelize.DECIMAL(12, 2), allowNull: false},
      username: {type: Sequelize.STRING, allowNull: false},
      name: {type: Sequelize.STRING, allowNull: false},
      middleName: {type: Sequelize.STRING, allowNull: true},
      phoneNumber: {type: Sequelize.STRING, allowNull: false},
      city: {type: Sequelize.STRING, allowNull: false},
      deliveryBranch: {type: Sequelize.STRING, allowNull: false},
      sellerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'RESTRICT'
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'RESTRICT'
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'products',
          key: 'id'
        },
        onDelete: 'RESTRICT'
      },

      createdAt: {allowNull: false, type: Sequelize.DATE},
      updatedAt: {allowNull: false, type: Sequelize.DATE}
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('orders');
  }
};