import ApiError from '../errors/ApiError.js';
import tokenService from '../services/tokenService.js';

export default function(role){
    return function(req, res, next){
        if(req.method === 'OPTIONS'){
            next()
        }
    
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) throw new ApiError(401, "User are not authorized1");

            const accessToken = authHeader.split(' ')[1];
            if (!accessToken) throw new ApiError(401, "User are not authorized2");

            const userData = tokenService.validateAccessToken(accessToken);
            if (!userData) throw new ApiError(401, "User are not authorized3");
            if(userData.role  !== role) throw new ApiError(403, "No access");

            req.user = userData;
            next();
        } 
        catch (error) {
            next(error);
        }
    }
}