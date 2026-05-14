import './SellerPage.scss';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';

import { getSeller, getProducts, changePage } from "../../store/product/productSlice.js";
import { formatDate } from "../../utils/formatDate.js";
import Rating from "../../components/Rating/Rating.jsx";
import Post from '../../components/Post/Post.jsx';
import Pagination from '../../components/Pagination/Pagination.jsx';

import SortBox from '../../components/SortBox/SortBox.jsx';
import Loading from '../../components/Loading/Loading.jsx';


const SellerPage = () => {
    const dispatch = useDispatch();
    const {isLoading, products, seller, pagination} = useSelector(state => state.product);
    const {user} = useSelector(state => state.user);
    const {id} = useParams();

    const [showPhone, setShowPhone] = useState(false);
    const [params, setParams] = useState({
        sortBy: 'createdAt',
        sortDir: 'desc'
    });

    const handleParams = (key, value) => {
        setParams((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    useEffect(()=>{
        dispatch(getSeller(id));
    }, [dispatch, id]);

    useEffect(()=>{
        dispatch(getProducts(`userId=${id}&sortBy=${params.sortBy}&sortDir=${params.sortDir}&page=${pagination.page}&limit=2`));
    }, [dispatch, id, params.sortBy, params.sortDir, pagination.page]);


    return (
        <div className="sellerPage">
            {
                seller?
                <div className="sellerInfo">
                    <div className="seller">
                        <div className="img"
                            style={{
                                backgroundImage: seller.avatar
                                    ? `url(http://localhost:3000/users/${seller.avatar})`
                                    : 'none'
                            }}
                        >
                            {
                                seller.avatar? '' : seller.username[0]
                            }
                        </div>
                        <div className="userInfo">
                            <span className='name'>
                                {seller.username}
                            </span>
                            <div className="row">
                                <Rating count={seller.averageRating} sellerId={seller?.id} size={32} disabled={false}/>
                                <span className='ratingCount'>
                                    &#40;<strong>{seller.ratingsCount}</strong> оцінок&#41;
                                </span>
                            </div>
                            <span className='data'>На сайті з {formatDate(seller.createdAt, true)}</span>
                        </div>
                    </div>
                    {
                        user?.id !== seller?.id?
                        <div className="buttons">
                            <Link to={`/chats/${seller?.id}`}>
                                <button className="message">
                                    написати продавцю
                                </button>
                            </Link>
                            <button className="show" onClick={()=>setShowPhone(true)}>
                                {showPhone? seller?.phoneNumber : 'показати номер'}
                            </button>
                        </div>
                        :
                        null
                    }
                </div>
                :
                null
            }
            <div className="sellerProducts">
                <div className='row'>
                    <h5>Оголошення продавця:</h5>
                    <SortBox params={params} onChange={handleParams} />
                </div>
                {
                    isLoading?
                    <Loading/>
                    :
                    products.length > 0?
                    <>
                        <ul className="products">
                            {
                                products.map((product) => {
                                    return <Post key={product.id} product={product} data={true}/>
                                })
                            }
                        </ul>
                        <Pagination dispatch={dispatch} pagination={pagination} changePage={changePage}/>
                    </>
                    :
                    <p className='noProducts'>Оголешень немає</p>
                }
            </div>
        </div>
    );
};

export default SellerPage;