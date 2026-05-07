import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';

const Chat = sequelize.define('chat', {
  id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
  user1Id: { type: DataTypes.INTEGER, allowNull: false },
  user2Id: { type: DataTypes.INTEGER, allowNull: false },
});

export default Chat;