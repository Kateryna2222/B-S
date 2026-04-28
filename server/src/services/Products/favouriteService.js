import favouriteRepository from "../../ropositories/favouriteRepository.js";
import userRepository from "../../ropositories/userRepository.js";
import productRepository from "../../ropositories/productRepository.js";
import ApiError from "../../errors/ApiError.js";

class FavouriteService{

    async checkExistance(data){
        const user = await userRepository.findOne('id', data.userId);
        if(!user) throw new ApiError(404, 'Користувача не знайдено');

        const product = await productRepository.findOne(data.productId);
        if(!product) throw new ApiError(404, 'Товар не знайдено');
    }

    async getFavourites(userId){
        const favourites = await favouriteRepository.findAll(userId);
        return favourites
    }

    async addToFavourite(data){
        await this.checkExistance(data);
        const res = await favouriteRepository.add(data);
        return res
    }

    async removeFromFavourite(data) {
        await this.checkExistance(data);
        const res = await favouriteRepository.delete(data);
        return { message: "Товар видалено з обраного" };
    }

}

export default new FavouriteService();
