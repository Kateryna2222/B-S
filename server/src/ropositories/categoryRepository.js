import Category from "../models/Category.js";

class CategoryRepository{

    async findOne(field, value) {
        return await Category.findOne({ where: { [field]: value } });
    }

    async findAll(parent_id) {
        return Category.findAll({ where: parent_id && { parent_id } });
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