import ApiError from "../errors/ApiError.js";
import UserRegistrationDto from "../DTO/user/UserRegistrationDto.js";
import UserLoginDto from "../DTO/user/UserLoginDto.js";
import UserGetDto from "../DTO/user/UserGetDto.js";
import mailService from "./mailService.js";
import tokenService from "./tokenService.js";
import userRepository from "../ropositories/userRepository.js";

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

    async registration(data){
        const userData = new UserRegistrationDto(data);
        const {email, password} = userData;

        const candidate = await userRepository.findOne('email', email);
        if(candidate) throw new ApiError(409, "User with this email already exist");

        const hashPassword = await bcrypt.hash(password, 10);
        const activationLink = uuidv4();

        const user = await userRepository.create({...userData, password: hashPassword, activationLink});
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/auth/activate/${activationLink}`);

        const res = await generateTokens(user);
        return res
    }

    async activate(activationLink){
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
        if(!user) throw new ApiError(404, 'User with this email not exist');

        const comparePass = await bcrypt.compare(password, user.password);
        if(!comparePass) throw new ApiError(401, 'Wrong password');

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
            throw new ApiError(401, 'User is unauthorized');
        }

        const user = await userRepository.findOne('id', userData.id);

        const res = await generateTokens(user);
        return res
    }
}

export default new AuthService();