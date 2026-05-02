'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ratings', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      sellerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE'
      },
      reviewerId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'users', key: 'id' },
        onDelete: 'SET NULL'
      },
      rating: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        validate: {
          min: 1,
          max: 5
        }
      }
    });

    await queryInterface.addConstraint('ratings', {
      fields: ['sellerId', 'reviewerId'],
      type: 'unique',
      name: 'unique_seller_reviewer'
    });

    await queryInterface.addConstraint('ratings', {
      fields: ['sellerId', 'reviewerId'],
      type: 'check',
      where: { sellerId: { [Sequelize.Op.ne]: Sequelize.col('reviewerId') } },
      name: 'no_self_review'
    });

  },


  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ratings');
  }
};