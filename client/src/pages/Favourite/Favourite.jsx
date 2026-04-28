import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getFavourites } from "../../store/favourite/favouriteSlice.js";
import MyPost from "../../components/MyPost/MyPost.jsx";
import Loading from "../../components/Loading/Loading.jsx";


const Favourite = () => {

    const dispatch = useDispatch();
    const { products, isLoading } = useSelector(state => state.favourite)

    useEffect(()=>{
        dispatch(getFavourites());
    }, [dispatch])

    return (
        <>
            <h5>Обрані товари</h5>
            {
                isLoading?
                <Loading/>
                :
                <div className="favouriteWrapper">
                    <ul className="favouritesProduct">
                        {
                            products.map((item, index) => {
                                return <MyPost key={index} product={item} data={true}/>
                            })
                        }
                    </ul>
                </div>
            }
        </>
    );
};

export default Favourite;