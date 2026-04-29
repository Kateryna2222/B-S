import favouriteService from "../services/Products/favouriteService.js";

function getData(req) {
    return {
        userId: req.user.id,
        productId: req.params.id
    };
}

class FavouriteController{

    async getProducts(req, res){
        const { id } = req.user; 
        const favourites = await favouriteService.getFavourites(id);
        return res.status(200).json(favourites);
    }

    async addProduct(req, res){
        const data = getData(req);
        const favourite = await favouriteService.addToFavourite(data);
        return res.status(200).json(favourite);
    }

    async deleteProduct(req, res){
        const data = getData(req);
        const deleted = await favouriteService.removeFromFavourite(data);
        return res.status(200).json(deleted)
    }

}

export default new FavouriteController();