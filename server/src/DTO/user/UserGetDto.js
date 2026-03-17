class UserGetDto{
    constructor(data){
        this.id = data.id,
        this.username = data.username,
        this.email = data.email,
        this.avatar = data.avatar || '',
        this.role = data.role,
        this.isActiveted = data.isActiveted
    }
}

export default UserGetDto;