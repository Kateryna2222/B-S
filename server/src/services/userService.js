import userRepository from "../ropositories/userRepository.js";
import ApiError from "../errors/ApiError.js";
import UserGetDto from "../DTO/user/UserGetDto.js";
import UserUpdateDto from "../DTO/user/UserUpdateDto.js";
import mailService from "./mailService.js";
import createFile from "../utils/createFile.js";

import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

class UserService{

    async updateUser(id, data, avatar) {
        const dto = new UserUpdateDto(data)

        const user = await userRepository.findOne("id", id);
        if (!user) throw new ApiError(404, "User not found");

        if (Object.keys(dto).length === 0) {
            throw new ApiError(400, "Змін немає");
        }

        if(dto.oldPassword && dto.newPassword){
            const comparePass = await bcrypt.compare(dto.oldPassword, user.password);
            if (!comparePass) throw new ApiError(401, "Неправильний пароль");

            const hashPassword = await bcrypt.hash(dto.newPassword, 10);
            user.password = hashPassword;
        }

        const fileName = avatar? await createFile(avatar, 'users') : null;

        if (dto.username) user.username = dto.username
        if (dto.phoneNumber) user.phoneNumber = dto.phoneNumber
        if (avatar) user.avatar = fileName

        await userRepository.save(user);
        return new UserGetDto(user);
    }


    async sendMailForRecover({email}){
        const user = await userRepository.findOne("email", email);
        if (!user) throw new ApiError(404, "Користувача не знайдено");

        const activationLink = uuidv4();

        user.activationLink = activationLink;
        await userRepository.save(user);

        await mailService.sendRecoverMail(email, `${process.env.CLIENT_URL}/auth/recover/${activationLink}`);
        return { message: "Лист для зміни пароль надіслано на Вашу пошту" };
    }

    async recoverPassword({activationLink, password}){
        if (!activationLink) {
            throw new ApiError(400, "Відсутній activation link");
        }
        console.log(activationLink)
        const user = await userRepository.findOne("activationLink", activationLink);
        if (!user) throw new ApiError(404, "Користувача не знайдено");

        const hashPassword = await bcrypt.hash(password, 10);

        user.password = hashPassword;
        user.activationLink = null;
        await userRepository.save(user);

        return { message: "Пароль було змінено" };
    }

    async deleteUser(id) {
        const user = await userRepository.findOne("id", id);
        if (!user) throw new ApiError(404, "User not found");

        await userRepository.delete(user);
        return { message: "Обліковий запис видалено" };
    }

}

export default new UserService();
