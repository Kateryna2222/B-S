import ApiError from "../errors/ApiError.js";
import userRepository from "../ropositories/userRepository.js";
import UserGetDto from "../DTO/user/UserGetDto.js";

class AdminService {

    async getAllUsers() {
        const users = await userRepository.findAll();
        return users.map(user => new UserGetDto(user));
    }

    async blockUser(userId) {
        const user = await userRepository.findOne("id", userId);
        if (!user) throw new ApiError(404, "User not found");

        const updatedUser = await userRepository.update(userId, { isActivated: false });
        return new UserGetDto(updatedUser);
    }

    async unblockUser(userId) {
        const user = await userRepository.findOne("id", userId);
        if (!user) throw new ApiError(404, "User not found");

        const updatedUser = await userRepository.update(userId, { isActivated: true });
        return new UserGetDto(updatedUser);
    }

    async changeUserRole(userId, role) {
        const user = await userRepository.findOne("id", userId);
        if (!user) throw new ApiError(404, "User not found");

        const updatedUser = await userRepository.update(userId, { role });
        return new UserGetDto(updatedUser);
    }
}

export default new AdminService();
