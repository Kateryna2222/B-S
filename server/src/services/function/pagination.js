
export const pagination = (qp, result) => {
    
    const totalCount = result.count;
    const totalPages = Math.ceil(totalCount / qp.limit);
    const hasNextPage = qp.page < totalPages;
    const hasPreviousPage = qp.page > 1;

    return {
        page: qp.page,
        limit: qp.limit,
        totalCount,
        totalPages,
        hasNextPage,
        hasPreviousPage
    }
}