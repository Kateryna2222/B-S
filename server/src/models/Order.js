import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';

const Order = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    deliveryMethod: {
        type: DataTypes.ENUM('nova_poshta', 'ukrposhta'),
        allowNull: false,
        defaultValue: 'nova_poshta'
    },
    username: {type: DataTypes.STRING, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    middleName: {type: DataTypes.STRING, allowNull: true},
    phoneNumber: {type: DataTypes.STRING, allowNull: false},
    city: {type: DataTypes.STRING, allowNull: false},
    deliveryBranch: {type: DataTypes.STRING, allowNull: false},
    sellerId: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        references: { 
            model: 'users', 
            key: 'id' 
        }, 
        onDelete: 'RESTRICT'
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users', 
            key: 'id'
        },
        onDelete: 'RESTRICT'
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'products', 
            key: 'id'
        },
        onDelete: 'RESTRICT'
    },
    priceAtPurchase: { type: DataTypes.DECIMAL(12, 2), allowNull: false}
})

export default Order;