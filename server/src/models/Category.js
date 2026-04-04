import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';

const Category = sequelize.define('category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.TEXT, allowNull: false},
    slug: {type: DataTypes.STRING, allowNull: false, unique: true},
    parent_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'categories', 
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    }
}, {timestamps: false})

export default Category;