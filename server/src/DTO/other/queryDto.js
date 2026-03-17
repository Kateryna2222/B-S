
class QueryDto{
    constructor(query){

        this.year = query.year? parseInt(query.year) : null
        this.languageId = query.languageId? parseInt(query.languageId) : null
        this.genres = query.genres ? query.genres.split(',').map(id => parseInt(id)) : [];
        this.author = query.author ? parseInt(query.author) : null;
        this.title = query.title?.toLowerCase() || null;

        this.search = query.search || null

        this.sortBy = query.sortBy || "year"
        this.sortDir = query.sortDir?.toLowerCase() === "desc" ? "DESC" : "ASC"

        this.page = parseInt(query.page) || 1
        this.limit = parseInt(query.limit) || 20

        if(this.page < 1) this.page = 1
        if(this.limit < 1 || this.limit > 20) this.limit = 20
    }

    get skip(){
        return (this.page - 1) * this.limit
    }

}

export default QueryDto;
