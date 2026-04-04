import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';

const Product = sequelize.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.TEXT},
    price: {type: DataTypes.DECIMAL(10, 2), allowNull: false},
    state: {
        type: DataTypes.ENUM('new', 'used'),
        allowNull: false,
        defaultValue: 'new'
    },
    status: {
        type: DataTypes.ENUM('pending', 'available', 'sold'),
        allowNull: false,
        defaultValue: 'available'
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'users', 
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'categories', 
            key: 'id'
        },
        onDelete: 'SET NULL'
    }
})

export default Product;