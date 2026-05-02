import ratingRepository from "../../ropositories/ratingRepository.js";
import userRepository from "../../ropositories/userRepository.js";
import ApiError from "../../errors/ApiError.js";

class RatingService{

    async checkExistance(sellerId){
        const user = await userRepository.findOne('id', sellerId);
        if(!user) throw new ApiError(404, 'Користувача не знайдено');
    }

    async getRating(sellerId){
        await this.checkExistance(sellerId);

        const rating = await ratingRepository.findOne(sellerId);
        return rating || { averageRating: 0, ratingsCount: 0 };
    }

    async setRating(data){
        await this.checkExistance(data.sellerId);

        if (Number(data.sellerId) === data.reviewerId) {
            throw new ApiError(403, 'Не можна себе оцінювати.');
        }

        const existing = await ratingRepository.findAssociation(data);
        if(existing){
            return await ratingRepository.update({rating: data.rating, obj: existing})
        }
        else{
            return await ratingRepository.create(data)
        }
    }

}

export default new RatingService();
