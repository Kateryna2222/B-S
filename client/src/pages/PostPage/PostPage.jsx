import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getProduct } from "../../store/product/productSlice.js";
import Loading from "../../components/Loading/Loading.jsx";

const PostPage = () => {

    const dispatch = useDispatch();
    const {currentProduct, isLoading} = useSelector(state => state.product)
    const {id} = useParams();

    const [showPhone, setShowPhone] = useState(false)

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
                    <p>Назва</p>
                    <h5 className="title">
                        {currentProduct.title}
                    </h5>
                    <p>Категорія</p>
                    <span className="category">
                        {currentProduct.category?.name}
                    </span>
                    <p>Опис</p>
                    <p className="info">
                        {currentProduct.description}
                    </p>
                    <p>Ціна</p>
                    <span>
                        {currentProduct.price}грн
                    </span>
                    <p>Продавець</p>
                    <span>
                        {currentProduct.user?.username}
                    </span>
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