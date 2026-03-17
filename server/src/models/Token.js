import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const Token = sequelize.define('token', {
    refreshToken: {type: DataTypes.STRING, allowNull: false},
    userId: {type: DataTypes.INTEGER, allowNull: false}
}, {timestamps: false})

export default Token;