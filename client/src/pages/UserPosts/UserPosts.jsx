import './UserPosts.scss';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { getProducts, changePage } from '../../store/product/productSlice.js';
import MyPost from '../../components/MyPost/MyPost.jsx';
import Loading from '../../components/Loading/Loading.jsx';
import Pagination from '../../components/Pagination/Pagination.jsx';

const UserPosts = () => {

    const { products, pagination, isLoading } = useSelector(state => state.product);
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [params, setParams] = useState('');
    const [activeButton, setActiveButton] = useState('');

    useEffect(() => {
        if (!user?.id) return;
        dispatch(getProducts(`userId=${user.id}&page=${pagination.page}&limit=2${params? `&status=${params}` : ''}`))
    }, [dispatch, params, user?.id, pagination.page])


    const filter = (type) => {
        setParams(type);
        setActiveButton(type);
        dispatch(changePage(1));
    }


    return (
        <div className="userPosts">
            <div className="create">
                <Link to='/my-products/create'>
                    Додати оголошення
                </Link>
            </div>
            <div className="wrapper">
                <ul className="filterBtns">
                    <li>
                        <button className={activeButton === '' ? 'active' : ''} 
                                onClick={()=>filter('')}>
                            Всі
                        </button>
                    </li>
                    <li>
                        <button className={activeButton === 'pending' ? 'active' : ''} 
                                onClick={()=>filter('pending')}>
                            В очікуванні
                        </button>
                    </li>
                    <li>
                        <button className={activeButton === 'available' ? 'active' : ''} 
                                onClick={()=>filter('available')}>
                            Активні
                        </button>
                    </li>
                    <li>
                        <button className={activeButton === 'sold' ? 'active' : ''} 
                                onClick={()=>filter('sold')}>
                            Продані
                        </button>
                    </li>
                </ul>
                <ul className="posts">
                    {
                        isLoading?
                        <Loading />
                        :
                        (
                            products.length?
                            products.map(product => {
                                return <MyPost key={product.id} product={product}/>
                            })
                            :
                            <p className='empthy'>Оголошень немає</p>
                        )
                    }
                </ul>
                <Pagination dispatch={dispatch}/>
            </div>
        </div>
    );
};

export default UserPosts;