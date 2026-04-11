import ApiError from "../errors/ApiError.js";
import UserRegistrationDto from "../DTO/user/UserRegistrationDto.js";
import UserLoginDto from "../DTO/user/UserLoginDto.js";
import UserGetDto from "../DTO/user/UserGetDto.js";
import mailService from "./mailService.js";
import tokenService from "./tokenService.js";
import userRepository from "../ropositories/userRepository.js";
import createFile from "../utils/createFile.js";

import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { config } from "dotenv";
config();

async function generateTokens(user){
    const userDto = new UserGetDto(user);
    const tokens = tokenService.generateTokens({...userDto});
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {...tokens, user: userDto}
}


class AuthService{

    async registration(data, avatar){
        const userData = new UserRegistrationDto(data);
        const {email, password} = userData;

        const candidate = await userRepository.findOne('email', email);
        if(candidate) throw new ApiError(409, "Користувач з даною поштою вже існує");

        const hashPassword = await bcrypt.hash(password, 10);
        const activationLink = uuidv4();

        const fileName = avatar? await createFile(avatar, 'users') : null;

        const user = await userRepository.create({
            ...userData, 
            password: hashPassword, 
            activationLink, 
            avatar: fileName 
        });

        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/auth/activate/${activationLink}`);

        const res = await generateTokens(user);
        return res
    }
    

    async activate(activationLink){
        if (!activationLink) {
            throw new ApiError(400, "Відсутній activation link");
        }
        const user = await userRepository.findOne('activationLink', activationLink);
        if(!user) throw new ApiError(400, 'Неправильне посилання активації');

        user.isActivated = true;
        user.activationLink = null;
        await user.save();
    }

    async login(data){
        const userData = new UserLoginDto(data);
        const {email, password} = userData;
        
        const user = await userRepository.findOne('email', email);
        if(!user) throw new ApiError(404, 'Користувача з цією поштою не існує');
        if(!user.isActivated) throw new ApiError(404, 'Профіль користувача не є активованим');

        const comparePass = await bcrypt.compare(password, user.password);
        if(!comparePass) throw new ApiError(401, 'Неправильний пароль');

        const res = await generateTokens(user);
        return res
    }

    async logout(refreshToken){
        if(!refreshToken) throw new ApiError(401, 'No refresh token provided');
        const token = await tokenService.deleteToken(refreshToken);
        return token;
    }

    async refresh(refreshToken){
        if(!refreshToken) throw new ApiError(401, 'No refresh token provided');
        
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDB = await tokenService.findToken(refreshToken);

        if(!userData || !tokenFromDB){
            throw new ApiError(401, 'Користувач не авторизований');
        }

        const user = await userRepository.findOne('id', userData.id);

        const res = await generateTokens(user);
        return res
    }
}

export default new AuthService();