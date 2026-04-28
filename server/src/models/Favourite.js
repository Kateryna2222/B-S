import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';

const Favourite = sequelize.define('favourite', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users', 
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'products', 
            key: 'id'
        },
        onDelete: 'CASCADE'
    }
}, {timestamps: false})

export default Favourite;