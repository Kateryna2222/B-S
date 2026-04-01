class UserUpdateDto {
    constructor(data) {
        if (data.username !== undefined) this.username = data.username
        if (data.phoneNumber !== undefined) this.phoneNumber = data.phoneNumber
        if (data.oldPassword !== undefined) this.oldPassword = data.oldPassword
        if (data.newPassword !== undefined) this.newPassword = data.newPassword
    }
}

export default UserUpdateDto;