
class UserQueryDto{
    constructor(query){
        // filter
        const validRoles = ['ADMIN', 'USER'];

        this.role = validRoles.includes(query.role) ? query.role : null;
        this.isActivated = query.isActivated || null;

        // search
        this.search = query.search || null;

        // sort
        this.sortBy = 'createdAt';
        this.sortDir = query.sortDir?.toLowerCase() === "asc" ? "ASC" : "DESC";

        // pagination
        this.page = parseInt(query.page) || 1
        this.limit = parseInt(query.limit) || 5
        if(this.page < 1) this.page = 1
        if(this.limit < 1 || this.limit > 50) this.limit = 20
    }

    get skip(){
        return (this.page - 1) * this.limit
    }

}

export default UserQueryDto;
