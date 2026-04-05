import { Op } from "sequelize";
import User from "../../models/User.js";
import Category from "../../models/Category.js";

const category = {
    model: Category, 
    as: 'category'
}

const user = { 
    model: User, 
    as: 'user',
    attributes: ['id', 'username', 'avatar', 'phoneNumber'] 
}

export const handleProductQuery = (qp) => {
    const include = [];
    const where = {};
    include.push({...category});

    // filter
    if(qp.title) where.title = { [Op.iLike]: `%${qp.title}%` };
    if (qp.minPrice || qp.maxPrice) {
        where.price = {};

        if (qp.minPrice) {
            where.price[Op.gte] = qp.minPrice;
        }

        if (qp.maxPrice) {
            where.price[Op.lte] = qp.maxPrice;
        }
    }
    if(qp.userId){
        where.userId = qp.userId;
        include.push({...user});
    }
    if (qp.category) {
        include.push({
            ...category,
            where: {
                slug: { [Op.iLike]: `%${qp.category}%` }
            }
        });
    }
    if(qp.state) where.state = qp.state;
    if(qp.status) where.status = qp.status;

    // search
    if (qp.search) {
        const words = qp.search.split(' ');

        where[Op.and] = words.map(word => ({
            [Op.or]: [
                { title: { [Op.iLike]: `%${word}%` } },
                { description: { [Op.iLike]: `%${word}%` } }
            ]
        }));
    }

    // sort
    const sortField = qp.sortBy;
    const order = [[sortField, qp.sortDir]];

    return {
        where,
        include,
        order,
        limit: qp.limit,
        offset: qp.skip
    };
}