import { validationResult } from "express-validator";

export default function(req, res, next){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            status: 400, 
            message: "Помилка валідації", 
            errors: errors.array() 
        });
    }
    next(); 
}