class UserUpdateDto{
    constructor(data){
        this.username = data.username,
        this.avatar = data.avatar || ''
    }
}

export default UserUpdateDto;