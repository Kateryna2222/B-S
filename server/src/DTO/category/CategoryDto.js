class CategoryDto{
    constructor(data){
        this.name = data.name,
        this.slug = data.slug,
        this.parent_id = data.parent_id 
    }
}

export default CategoryDto;