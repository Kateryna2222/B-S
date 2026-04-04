import categoryRepository from "../../ropositories/categoryRepository.js";
import ApiError from "../../errors/ApiError.js";
import CategoryDto from "../../DTO/category/CategoryDto.js";

class CategoryService{

    async getCategory(id){
        const category = await categoryRepository.findOne("id", id);
        if (!category) throw new ApiError(404, "Категорію не знайдено");
        return category
    }

    async getCategories(parent_id){
        const categories = await categoryRepository.findAll(parent_id);
        return categories
    }

    async createCategory(data){
        const dto = new CategoryDto(data);
        const category = await categoryRepository.create(dto);
        return category
    }

    async updateCategory(id, data){
        const category = await this.getCategory(id);

        const dto = new CategoryDto(category)

        Object.keys(dto).forEach(field => {
            if (data[field] !== undefined) {
                category[field] = data[field];
            }
        });

        const updatedCategory = await categoryRepository.save(category);
        return updatedCategory
    }

    async deleteCategory(id) {
        const category = await this.getCategory(id);
        await categoryRepository.delete(category);
        return { message: "Категорію видалено" };
    }

}

export default new CategoryService();
