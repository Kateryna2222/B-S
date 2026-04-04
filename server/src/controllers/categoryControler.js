import categoryService from "../services/Products/categoryService.js";

class CategoryController{

    async getCategory(req, res){
        const category = await categoryService.getCategory(req.params.id);
        return res.status(200).json(category);
    }

    async getCategories(req, res){
        const categories = await categoryService.getCategories(req.params.parent_id || undefined);
        return res.status(200).json(categories);
    }

    async careteCategory(req, res){
        const category = await categoryService.createCategory(req.body);
        return res.status(200).json(category);
    }

    async updateCategory(req, res){
        const category = await categoryService.updateCategory(req.params.id, req.body);
        return res.status(200).json(category);
    }

    async deleteCategory(req, res){
        await categoryService.deleteCategory(req.params.id)
        return res.status(200).json({message: 'Категорію видалено'})
    }

}

export default new CategoryController();