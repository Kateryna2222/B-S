import ApiError from "../errors/ApiError.js";

export default function(err, req, res, next){

    console.log(err);
    
    const status = err instanceof ApiError ? err.status : 500; 
    const message = err.message || 'Internal Server Error';
    const errors = err.errors || [];

    return res.status(status).json({status, message, errors});
}