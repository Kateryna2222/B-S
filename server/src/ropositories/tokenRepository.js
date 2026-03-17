import Token from "../models/Token.js";

class TokenRepository{

    async findOneByUserId(userId){
        return await Token.findOne({ where: { userId } });
    }

    async findOneByRefreshToken(refreshToken){
        return await Token.findOne({ where: { refreshToken } });
    }

    async create(userId, refreshToken){
        return await Token.create({userId, refreshToken});
    }

    async save(token){
        return await token.save();
    }

    async delete(token){
        return await token.destroy();
    }

}

export default new TokenRepository();