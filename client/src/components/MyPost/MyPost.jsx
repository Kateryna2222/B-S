import './MyPost.scss';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';

import editImg from '../../assets/edit.svg';
import { deleteProduct } from '../../store/product/productSlice.js';
import { formatDate } from './formatDate.js';

const MyPost = ({product, data = false}) => {
    const dispatch = useDispatch();

    const link = `/my-products/edit/${product.id}`;


    return (
        <li>
            <div className="post">
                <div className="wrapper">
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

export default MyPost;