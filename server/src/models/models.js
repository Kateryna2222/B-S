import Token from "./Token.js";
import User from "./User.js";
import Category from "./Category.js";

User.hasOne(Token, { onDelete: 'CASCADE' });
Token.belongsTo(User);

Category.hasMany(Category, { as: 'subcategories', foreignKey: 'parent_id' });
Category.belongsTo(Category, { as: 'parent', foreignKey: 'parent_id' });