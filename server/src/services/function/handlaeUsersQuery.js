import { Op } from "sequelize";

export const handleUsersQuery = (qp) => {
    const where = {};

    // filter
    if(qp.isActivated) where.isActivated = qp.isActivated;
    if(qp.role) where.role = qp.role;

    // search
    if (qp.search) {
        where.username = {
            [Op.iLike]: `%${qp.search}%`
        };
    }

    // sort
    const sortField = qp.sortBy;
    const order = [[sortField, qp.sortDir]];

    return {
        where,
        order,
        limit: qp.limit,
        offset: qp.skip
    };
}