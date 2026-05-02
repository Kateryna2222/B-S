import User from "../models/User.js";
import Rating from "../models/Rating.js";
import { fn, col } from 'sequelize';

class RatingRepository{

    async findOne(sellerId) {
        const result = await Rating.findOne({
            where: { sellerId },
            attributes: [
                [fn('AVG', col('rating')), 'averageRating'],
                [fn('COUNT', col('id')), 'ratingsCount']
            ],
            raw: true
        });

        return {
            averageRating: result?.averageRating ? Number(result.averageRating) : 0,
            ratingsCount: result?.ratingsCount ? Number(result.ratingsCount) : 0
        };
    }

    async create(data){
        return await Rating.create(data);
    }
    
    async update({rating, obj}){
        return await obj.update({ rating: rating });
    }

    async findAssociation(data){
        return await Rating.findOne({
            where: {
                sellerId: data.sellerId,
                reviewerId: data.reviewerId
            }
        });
    }

}

export default new RatingRepository();