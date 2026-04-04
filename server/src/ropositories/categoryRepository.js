import Category from "../models/Category.js";

class CategoryRepository{

    async findOne(field, value) {
        return await Category.findOne({ where: { [field]: value } });
    }

    async findAll(parent_id) {
        const whereClause = parent_id !== undefined ? { parent_id } : undefined;
        return await Category.findAll({ where: whereClause });
    }

    async create(data){
        return await Category.create({...data});
    }

    async save(category){
        return await category.save();
    }

    async delete(category){
        return await category.destroy();
    }

}

export default new CategoryRepository();