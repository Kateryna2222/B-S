
class ProductQueryDto{
    constructor(query){
        // filter
        const validStates = ['new', 'used'];
        const allowerSort = ["createdAt", "price", "title"];
        const validStatuses = ['pending', 'available', 'sold'];

        this.title = query.title || null;
        this.minPrice = query.minPrice ? parseFloat(query.minPrice) : null;
        this.maxPrice = query.maxPrice ? parseFloat(query.maxPrice) : null;
        this.userId = query.userId? parseInt(query.userId) : null;
        this.category = query.category || null;
        this.state = validStates.includes(query.state) ? query.state : null;
        this.status = validStatuses.includes(query.status) ? query.status : null;

        // search
        this.search = query.search || null;

        // sort
        this.sortBy = allowerSort.includes(query.sortBy) ? query.sortBy : 'createdAt';
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

export default ProductQueryDto;
