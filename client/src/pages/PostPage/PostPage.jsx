import './PostPage.scss';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getProduct } from "../../store/product/productSlice.js";
import { formatDate } from '../../utils/formatDate.js';
import ImagesSlider from "../../components/ImagesSlider/ImagesSlider.jsx";
import Loading from "../../components/Loading/Loading.jsx";
import Rating from '../../components/Rating/Rating.jsx';

const PostPage = () => {

    const dispatch = useDispatch();
    const {currentProduct, isLoading} = useSelector(state => state.product)
    const {id} = useParams();

    const [showPhone, setShowPhone] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(()=>{
        if(id){
            dispatch(getProduct(`${id}?user=true`))
        }
    }, [id])

    return (
        <>
            {
                isLoading?
                <Loading/>
                :
                !currentProduct?
                <p>Товар не знайдено</p>
                :
                <div className="postPage">
                    <ImagesSlider images={currentProduct.images} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} onlyRead={true}/>
                    <p className='date'>Опубліковано {formatDate(currentProduct.createdAt)}</p>
                    <h5 className="title">
                        {currentProduct.title}
                    </h5>
                    <span className='price'>
                        {currentProduct.price} грн
                    </span>
                    <div className='state'>
                        <p>Стан:</p>
                        <span className="category">
                            {currentProduct.state === 'new'? 'нове' : 'б/у'}
                        </span>
                    </div>
                    <div className='categoryWrapper'>
                        <p>Категорія:</p>
                        <span className="category">
                            {currentProduct.category?.name}
                        </span>
                    </div>
                    {
                        currentProduct?.description?.length > 0?
                        <>
                            <p className='description'>Опис:</p>
                            <p className="info">
                                {currentProduct.description}
                            </p>
                        </>
                        :
                        null
                    }
                    <div className="seller">
                        <p>Продавець:</p>
                        <div className="user">
                            <div className="img"
                                style={{
                                    backgroundImage: currentProduct.user?.avatar
                                        ? `url(http://localhost:3000/users/${currentProduct.user?.avatar})`
                                        : 'none'
                                }}
                            >
                                {
                                    currentProduct.user?.avatar? '' : currentProduct.user?.username[0]
                                }
                            </div>
                            <div className="userInfo">
                                <div className="row">
                                    <span className='name'>
                                        {currentProduct.user?.username}
                                    </span>
                                    <Rating count={currentProduct.user?.averageRating} sellerId={currentProduct.user?.id} size={30}/>
                                </div>
                                <span className='ratingCount'>
                                    оцінило <strong>{currentProduct.user?.ratingsCount}</strong> користувачів
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="buttons">
                        <button className="message">
                            написати продавцю
                        </button>
                        <button className="show" onClick={()=>setShowPhone(true)}>
                            {showPhone? currentProduct.user?.phoneNumber : 'показати номер'}
                        </button>
                    </div>
                </div>
            }
        </>
    );
};

export default PostPage;