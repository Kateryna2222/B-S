import Token from "./Token.js";
import User from "./User.js";

User.hasOne(Token, { onDelete: 'CASCADE' });
Token.belongsTo(User);