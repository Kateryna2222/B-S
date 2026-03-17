class UserLoginDto{
    constructor(data){
        this.email = data.email,
        this.password = data.password
    }
}

export default UserLoginDto;