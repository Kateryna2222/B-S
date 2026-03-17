import userRepository from "../ropositories/userRepository.js";
import ApiError from "../errors/ApiError.js";
import UserGetDto from "../DTO/user/UserGetDto.js";

import bcrypt from 'bcrypt';

class UserService{
    
    async getUserById(userId){
        const user = await userRepository.findOne("id", userId);
        if (!user) throw new ApiError(404, "User not found");
        return new UserGetDto(user);
    }

    async updateUser(userId, data) {
        const user = await userRepository.findOne("id", userId);
        if (!user) throw new ApiError(404, "User not found");

        const updatedFields = {};
        ["firstName", "lastName", "phoneNumber", "avatar"].forEach(field => {
            if (data[field] !== undefined) updatedFields[field] = data[field];
        });

        const updatedUser = await userRepository.update(userId, updatedFields);
        return new UserGetDto(updatedUser);
    }

    async updatePassword(userId, oldPassword, newPassword) {
        const user = await userRepository.findOne("id", userId);
        if (!user) throw new ApiError(404, "User not found");

        const comparePass = await bcrypt.compare(oldPassword, user.password);
        if (!comparePass) throw new ApiError(401, "Old password is incorrect");

        const hashPassword = await bcrypt.hash(newPassword, 10);
        await userRepository.update(userId, { password: hashPassword });
        return { message: "Password updated successfully" };
    }

    //async deleteUser(){} //soft delete?
    async deleteUser(userId) {
        const user = await userRepository.findOne("id", userId);
        if (!user) throw new ApiError(404, "User not found");

        await userRepository.delete(userId);
        return { message: "User deleted successfully" };
    }

}

export default new UserService();
