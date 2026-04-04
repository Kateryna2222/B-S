import Token from "./Token.js";
import User from "./User.js";
import Category from "./Category.js";
import Product from "./Product.js";

User.hasOne(Token, { onDelete: 'CASCADE' });
Token.belongsTo(User);

Category.hasMany(Category, { as: 'subcategories', foreignKey: 'parent_id' });
Category.belongsTo(Category, { as: 'parent', foreignKey: 'parent_id' });

User.hasMany(Product, { as: 'products', foreignKey: 'userId' });
Product.belongsTo(User, { as: 'user', foreignKey: 'userId' });

Category.hasMany(Product, { as: 'products', foreignKey: 'categoryId' });
Product.belongsTo(Category, { as: 'category', foreignKey: 'categoryId' });

// Product.hasMany(ProductImage, { as: 'images', foreignKey: 'product_id' });
// ProductImage.belongsTo(Product, { foreignKey: 'product_id' });