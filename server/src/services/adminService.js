import ApiError from "../errors/ApiError.js";
import userRepository from "../ropositories/userRepository.js";
import UserGetDto from "../DTO/user/UserGetDto.js";
import UserQueryDto from "../DTO/other/userQueryDto.js";
import { handleUsersQuery } from "./function/handlaeUsersQuery.js";

import { pagination } from "./function/pagination.js";

class AdminService {

    async getAllUsers(query) {

        const qp = new UserQueryDto(query);
        const params = handleUsersQuery(qp);

        const result = await userRepository.findAll({...params});
        console.log('RES' + result)
        const users = result.rows.map(user => new UserGetDto(user));
        
        const pageData = pagination(qp, result);

        return {
            users,
            ...pageData
        }
    }

    async blockUser(userId) {
        const user = await userRepository.findOne("id", userId);
        if (!user) throw new ApiError(404, "User not found");

        user.isBlocked = true;
        const updatedUser = await userRepository.save(user);
        return new UserGetDto(updatedUser);
    }

    async unblockUser(userId) {
        const user = await userRepository.findOne("id", userId);
        if (!user) throw new ApiError(404, "User not found");

        user.isBlocked = false;
        const updatedUser = await userRepository.save(user);
        return new UserGetDto(updatedUser);
    }

    async changeUserRole(userId, role) {
        const user = await userRepository.findOne("id", userId);
        if (!user) throw new ApiError(404, "User not found");

        user.role = role;
        const updatedUser = await userRepository.save(user);
        return new UserGetDto(updatedUser);
    }

}

export default new AdminService();
