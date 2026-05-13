import User from "../models/User.js";
import Rating from "../models/Rating.js";
import { fn, col } from 'sequelize';

const ratingInclude = [
    {
        model: Rating,
        as: 'receivedRatings',
        attributes: []
    }
];

const attributes = [
    'id', 'username', 'avatar', 'phoneNumber', 'createdAt',
    [fn('AVG', col('receivedRatings.rating')), 'averageRating'],
    [fn('COUNT', col('receivedRatings.id')), 'ratingsCount']
]

class UserRepository{

    async getSeller(id) {
        return await User.findByPk(id, {
            attributes,
            include: ratingInclude,
            group: ['user.id']
        });
    }

    async findOne(field, value) {
        return await User.findOne({ where: { [field]: value } });
    }

    async findAll(query) {
        return await User.findAndCountAll({
            ...query,
            distinct: true
        });
    }

    async create(data){
        return await User.create({...data});
    }

    async save(user){
        return await user.save();
    }

    async delete(user){
        return await user.destroy();
    }

}

export default new UserRepository();