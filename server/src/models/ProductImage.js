import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';

const ProductImage = sequelize.define('product_image', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    image_url: {type: DataTypes.TEXT, allowNull: false},
    productId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'products', 
            key: 'id'
        },
        onDelete: 'CASCADE'
    }
}, {timestamps: false})

export default ProductImage;