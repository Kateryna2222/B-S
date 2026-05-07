import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';

const Message = sequelize.define('message', {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    chatId: { type: DataTypes.UUID, allowNull: false },
    senderId: { type: DataTypes.INTEGER, allowNull: true },
    content: { type: DataTypes.TEXT, allowNull: true },
    imageUrl: { type: DataTypes.STRING, allowNull: true },
    messageType: { type: DataTypes.ENUM('text', 'image', 'mixed'), defaultValue: 'text' }
});

export default Message;