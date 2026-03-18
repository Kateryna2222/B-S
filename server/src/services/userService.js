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
        ["username", "avatar"].forEach(field => {
            if (data[field] !== undefined) updatedFields[field] = data[field];
        });

        if (Object.keys(updatedFields).length === 0) {
            throw new ApiError(400, "No valid fields to update");
        }

        const updatedUser = await userRepository.update(user, updatedFields);
        return new UserGetDto(updatedUser);
    }

    async updatePassword(userId, oldPassword, newPassword) {
        const user = await userRepository.findOne("id", userId);
        if (!user) throw new ApiError(404, "User not found");

        const comparePass = await bcrypt.compare(oldPassword, user.password);
        if (!comparePass) throw new ApiError(401, "Old password is incorrect");

        const hashPassword = await bcrypt.hash(newPassword, 10);
        await userRepository.update(user, { password: hashPassword });
        return { message: "Password updated successfully" };
    }

    async deleteUser(userId) {
        const user = await userRepository.findOne("id", userId);
        if (!user) throw new ApiError(404, "User not found");

        await userRepository.delete(user);
        return { message: "User deleted successfully" };
    }

}

export default new UserService();
