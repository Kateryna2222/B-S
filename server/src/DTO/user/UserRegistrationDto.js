class UserRegistrationDto{
    constructor(data){
        this.username = data.username,
        this.password = data.password,
        this.email = data.email,
        this.avatar = data.avatar || '',
        this.role = data.role?.toUpperCase() || 'USER'
    }
}

export default UserRegistrationDto;