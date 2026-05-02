import ratingService from "../services/Rating/ratingService.js";

class RatingController{

    async getRating(req, res){
        const { sellerId } = req.params;

        const rating = await ratingService.getRating(sellerId);
        return res.status(200).json(rating);
    }

    async setRating(req, res){
        const reviewerId = req.user.id; 
        const { sellerId } = req.params;
        const { rating } = req.body;

        const result = await ratingService.setRating({reviewerId, sellerId, rating});
        return res.status(200).json({result});
    }

}

export default new RatingController();