import productImageRepository from "../../ropositories/productImageRepository.js";
import createFile from "../../utils/createFile.js";

class ProductImageService{

    async createImgs(productId, images, options = {}){
        if (!images) return; 

        const files = [];
        const imgsArray = Array.isArray(images) ? images : [images];

        for (const img of imgsArray){
            const fileName = await createFile(img, 'products');
            const file = await productImageRepository.create({productId, image_url: fileName}, options);
            if(file){
                files.push(file)
            }
        }
        return files
    }

    async deleteImgs(productId, options = {}) {
        const res = await productImageRepository.deleteByProductId(productId, options);
        return { message: "Зображення видалено" };
    }

}

export default new ProductImageService();
