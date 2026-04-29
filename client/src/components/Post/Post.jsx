import './Post.scss';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import editImg from '../../assets/edit.svg';
import heartTrue from '../../assets/heartTrue.svg';
import heartFalse from '../../assets/heartFalse.svg';
import { deleteProduct } from '../../store/product/productSlice.js';
import { formatDate } from '../../utils/formatDate.js';
import { addToFavourite, removeFromFavourite } from '../../store/favourite/favouriteSlice.js';

const Post = ({product, data = false}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const link = `/my-products/edit/${product.id}`;

    const {isAuth} = useSelector(state => state.user);
    const { products } = useSelector(state => state.favourite);

    const isHeart = products.some(item => item.id === product.id)
        ? heartTrue
        : heartFalse;

    const handleHeartClick = () => {

        if(!isAuth){
            navigate('/auth/login');
            return
        }

        if (isHeart === heartFalse) {
            dispatch(addToFavourite(product.id));
        } else {
            dispatch(removeFromFavourite(product.id));
        }
    };

    return (
        <li>
            <div className="post">
                <div className="wrapper">
                    <button className='heart' onClick={handleHeartClick}>
                        <img src={isHeart} alt="heart"/>
                    </button>
                    <div className="img">
                        {
                            product.images?.length ?
                            <img src={`http://localhost:3000/products/${product.images[0].image_url}`} alt={product.title || "product"} />
                            :
                            null
                        }
                    </div>
                    <div className="info">
                        <Link to={`/products/${product.id}`} className="title">
                            {product.title}
                        </Link>
                        <span className="price">
                            {`${product.price} грн`}
                        </span>
                        {
                            !data?
                            null
                            :
                            <span className='data'>
                                {formatDate(product.createdAt)}
                            </span>
                        }
                    </div>
                </div>
                {
                    data?
                    null
                    :
                    <div className="buttons">
                        <button className="delete" onClick={()=>dispatch(deleteProduct(product.id))}
                        ></button>
                        <div className="edit">
                            <Link to={link}>
                                <img src={editImg} alt="edit" />
                            </Link>
                        </div>
                    </div>
                }
            </div>
        </li>
    );
};

export default Post;