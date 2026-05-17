import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';

const Notification = sequelize.define('notification', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false},
    message: { type: DataTypes.TEXT, allowNull: true},
    isRead: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
    userId: { type: DataTypes.INTEGER, allowNull: false}
});

export default Notification;