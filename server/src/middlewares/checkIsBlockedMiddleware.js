import ApiError from '../errors/ApiError.js';
import tokenService from '../services/tokenService.js';
import userService from '../services/userService.js';

export default function(){
    return async function(req, res, next){
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
            const user = await userService.findUser(userData.id);
            if(user.isBlocked) throw new ApiError(403, "Користувача заблоковано");
            req.user = {...userData, isBlocked: user.isBlocked};
            next();
        } 
        catch (error) {
            next(error);
        }
    }
}