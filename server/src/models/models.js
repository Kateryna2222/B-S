import Token from "./Token.js";
import User from "./User.js";
import Category from "./Category.js";
import Product from "./Product.js";
import ProductImage from "./ProductImage.js";
import Favourite from "./Favourite.js";
import Rating from "./Rating.js";
import Chat from "./Chat.js";
import Message from "./Message.js";

User.hasOne(Token, { onDelete: 'CASCADE' });
Token.belongsTo(User);

Category.hasMany(Category, { as: 'subcategories', foreignKey: 'parent_id' });
Category.belongsTo(Category, { as: 'parent', foreignKey: 'parent_id' });

User.hasMany(Product, { as: 'products', foreignKey: 'userId' });
Product.belongsTo(User, { as: 'user', foreignKey: 'userId' });

Category.hasMany(Product, { as: 'products', foreignKey: 'categoryId' });
Product.belongsTo(Category, { as: 'category', foreignKey: 'categoryId' });

Product.hasMany(ProductImage, { as: 'images', foreignKey: 'productId' });
ProductImage.belongsTo(Product, { foreignKey: 'productId' });

Favourite.belongsTo(Product, { foreignKey: 'productId', as: 'product'});
Product.hasMany(Favourite, { foreignKey: 'productId'});


//Rating
Rating.belongsTo(User, { foreignKey: 'sellerId', as: 'seller'});
Rating.belongsTo(User, { foreignKey: 'reviewerId', as: 'reviewer'});
User.hasMany(Rating, { foreignKey: 'sellerId', as: 'receivedRatings' });
User.hasMany(Rating, { foreignKey: 'reviewerId', as: 'givenRatings' });


//Chat
Chat.belongsTo(User, { foreignKey: 'user1Id', as: 'user1' });
Chat.belongsTo(User, { foreignKey: 'user2Id', as: 'user2' });
Chat.hasMany(Message, { foreignKey: 'chatId', onDelete: 'CASCADE' });
Message.belongsTo(Chat, { foreignKey: 'chatId' });
Message.belongsTo(User, { foreignKey: 'senderId', as: 'sender' });