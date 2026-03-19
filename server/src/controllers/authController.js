import authService from "../services/authService.js";


function setCookie(res, refreshToken){
    res.cookie(
        'refreshToken', 
        refreshToken, 
        {
            maxAge: 20 * 24 * 60 * 60 * 1000, 
            httpOnly: true,
            secure: false,          
            sameSite: 'none' 
        }
    );
}

class AuthController{

    async registration(req, res){
        const userData = await authService.registration(req.body);
        const {refreshToken, ...responseData } = userData;

        setCookie(res, refreshToken);
        return res.status(201).json({...responseData });
    }

    async login(req, res){
        const userData = await authService.login(req.body);
        const {refreshToken, ...responseData } = userData;
        
        setCookie(res, refreshToken);
        return res.status(200).json({...responseData });
    }

    async logout(req, res){
        const {refreshToken} = req.cookies;
        await authService.logout(refreshToken);
        res.clearCookie('refreshToken');
        return res.json({message: 'You logout'})
    }

    async activate(req, res){
        const activationLink = req.params.link;
        await authService.activate(activationLink);
        return res.redirect(process.env.SERVER_URL);
    }

    async refresh(req, res){
        const {refreshToken} = req.cookies;
        const userData = await authService.refresh(refreshToken);
        const {refreshToken: newRefreshToken, ...responseData } = userData;

        setCookie(res, newRefreshToken);
        return res.status(200).json({...responseData });
    }

}

export default new AuthController();