class UserUpdateDto{
    constructor(data){
        this.username = data.username,
        this.avatar = data.avatar || '',
        this.phoneNumber = data.phoneNumber
    }
}

export default UserUpdateDto;