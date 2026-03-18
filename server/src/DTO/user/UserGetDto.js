class UserGetDto{
    constructor(data){
        this.id = data.id,
        this.username = data.username,
        this.email = data.email,
        this.avatar = data.avatar || '',
        this.role = data.role,
        this.phoneNumber = data.phoneNumber,
        this.isActivated = data.isActivated
    }
}

export default UserGetDto;