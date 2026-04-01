import ApiError from '../errors/ApiError.js';
import tokenService from '../services/tokenService.js';

export default function(req, res, next){
    if(req.method === 'OPTIONS'){
        return next()
    }

    try { 
        const authHeader = req.headers.authorization;
        if (!authHeader) throw new ApiError(401, "User not authorized");

        const accessToken = authHeader.split(' ')[1];
        if (!accessToken) throw new ApiError(401, "User not authorized");

        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) throw new ApiError(401, "User not authorized");

        req.user = userData;
        next();
    } 
    catch (error) {
        next(error);
    }
}