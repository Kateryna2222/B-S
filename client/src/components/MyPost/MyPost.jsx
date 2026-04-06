import './MyPost.scss';
import { Link } from "react-router-dom";

import editImg from '../../assets/edit.svg';

const MyPost = ({product}) => {

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
                        <span className="title">
                            {product.title}
                        </span>
                        <span className="price">
                            {`${product.price} грн`}
                        </span>
                    </div>
                </div>
                <div className="buttons">
                    <button className="delete"></button>
                    <div className="edit">
                        <Link to={link}>
                            <img src={editImg} alt="edit" />
                        </Link>
                    </div>
                </div>
            </div>
        </li>
    );
};

export default MyPost;