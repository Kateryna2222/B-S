import './Home.scss';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getProducts } from '../../store/product/productSlice.js';
import Loading from '../../components/Loading/Loading';
import MyPost from '../../components/MyPost/MyPost.jsx';
import Category from '../../components/Category/Category.jsx';
import Search from '../../components/Search/Search.jsx';
import Filter from '../../components/Filter/Filter.jsx';
import { buildFilterQuery, buildQuery } from '../../components/Filter/buildProductsQuery.js';

const Home = () => {
    
    const dispatch = useDispatch();
    const {pagination, isLoading, products} = useSelector(state => state.product);
    const {currentCategory} = useSelector(state => state.category);
    const queryBase = `page=${pagination.page}&limit=16`;

    const [params, setParams] = useState({
        search: '',
        sortBy: 'createdAt',
        sortDir: 'desc',
        minPrice: '',
        maxPrice: '',
        state: ''
    });

    const handleFormValue = (key, value) => {
        setParams((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const buildParams = () => {
        const queryParams = buildQuery(params);
        const query =`${queryBase}${queryParams}`;
        return query
    }
    
    useEffect(() => {
        
    }, []);

    useEffect(() => {
        const query = buildParams();
        dispatch(getProducts(query));
    }, [dispatch, pagination.page, params.search, params.sortBy, params.sortDir]);


    const applyFilters = () => {
        const query = buildParams();
        const filter = buildFilterQuery(params, currentCategory);
        dispatch(getProducts(`${query}${filter}`));
    };

    const resetFilters = () => {
        const cleared = {
            ...params,
            minPrice: '',
            maxPrice: '',
            state: '',
            category: ''
        };

        setParams(cleared);
        const query = buildParams();
        dispatch(getProducts(`${query}`));
    };

    return (
        <div className="home">
            <Search onSearch={(value) => {
                handleFormValue("search", value)
            }}/>
            {
                isLoading? 
                <Loading/>
                :
                <Category/>
            }
            <Filter
                params={params}
                onChange={handleFormValue}
                onApply={applyFilters}
                onReset={resetFilters}
            />
            {
                isLoading? 
                <Loading/>
                :
                products.length?
                <ul className="products">
                    {
                        products.map(product => {
                            return <MyPost product={product} data={true} key={product?.id}/>
                        })
                    }
                </ul>
                :
                <span>Товарів не знайдено</span>
            }
        </div>
    );
};

export default Home;