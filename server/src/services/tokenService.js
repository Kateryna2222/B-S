import jwt from 'jsonwebtoken';

import tokenRepository from '../ropositories/tokenRepository.js';

class TokenService{
    generateTokens(payload){
        const accessToken = jwt.sign(
            payload,
            process.env.JWT_ACCESS_SECRET,
            { expiresIn: '30m'}
        );

        const refreshToken = jwt.sign(
            payload,
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: '20d'}
        );

        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token){
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        } 
        catch (error) {
            return null;
        }
    }

    validateRefreshToken(token){
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } 
        catch (error) {
            return null;
        }
    }

    async saveToken(userId, refreshToken){
        const tokenData = await tokenRepository.findOneByUserId(userId);
        if(tokenData){
            tokenData.refreshToken = refreshToken;
            return await tokenRepository.save(tokenData);
        }

        const token = await tokenRepository.create(userId, refreshToken);
        return token;
    }

    async deleteToken(refreshToken){
        const token = await tokenRepository.findOneByRefreshToken(refreshToken);
        if (!token) return null;

        await tokenRepository.delete(token);
        return token;
    }

    async findToken(refreshToken){
        const token = await tokenRepository.findOneByRefreshToken(refreshToken);
        return token
    }

}

export default new TokenService();