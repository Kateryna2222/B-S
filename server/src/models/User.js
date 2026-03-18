import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    username: {type: DataTypes.STRING, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    avatar: {type: DataTypes.STRING, allowNull: true},
    role: {type: DataTypes.STRING, defaultValue: 'USER'},
    phoneNumber: {type: DataTypes.STRING, allowNull: false },
    isActivated: {type: DataTypes.BOOLEAN, defaultValue: false},
    activationLink: {type: DataTypes.STRING}
})

export default User;