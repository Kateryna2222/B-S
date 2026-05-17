import ApiError from '../errors/ApiError.js';
import tokenService from '../services/tokenService.js';

export default function(req, res, next){
    if(req.method === 'OPTIONS'){
        return next()
    }

    try { 
        const authHeader = req.headers.authorization;
        if (!authHeader) throw new ApiError(401, "Користувач не авторизований");

        const accessToken = authHeader.split(' ')[1];
        if (!accessToken) throw new ApiError(401, "Користувач не авторизований");

        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) throw new ApiError(401, "Користувач не авторизований");

        req.user = userData;
        next();
    } 
    catch (error) {
        next(error);
    }
}