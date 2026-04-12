export const buildQuery = (params) => {
    let query = ``;

    //search
    if (params.search) query += `&search=${params.search}`;

    //sort 
    query += `&sortBy=${params.sortBy}&sortDir=${params.sortDir}`;

    return query;
};

export const buildFilterQuery = (params, currentCategory) => {
    let query = ``;

    //filter
    if (params.minPrice !== null && params.minPrice !== '') {
        query += `&minPrice=${params.minPrice}`;
    }
    if (params.maxPrice !== null && params.maxPrice !== '') {
        query += `&maxPrice=${params.maxPrice}`;
    }
    if (params.state) query += `&state=${params.state}`;
    if (currentCategory) query += `&category=${currentCategory.slug}`;

    return query;
};