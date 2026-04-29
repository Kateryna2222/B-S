import './Favourite.scss';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Post from "../../components/Post/Post.jsx";
import Loading from "../../components/Loading/Loading.jsx";
import Pagination from '../../components/Pagination/Pagination.jsx';


const Favourite = () => {

    const dispatch = useDispatch();
    const { products, isLoading } = useSelector(state => state.favourite);

    const [page, setPage] = useState(1);
    const limit = 16;
    const visible = products.slice(0, page * limit);
    const hasMore = visible.length < products.length;

    return (
        <>
            <h5>Обрані товари</h5>
            {
                isLoading?
                <Loading/>
                :
                products.length?
                <div className="favouriteWrapper">
                    <ul className="favouritesProduct">
                        {
                            visible.map((item, index) => {
                                return <Post key={index} product={item} data={true}/>
                            })
                        }
                    </ul>
                    {
                        hasMore && (
                            <button className='showMore' onClick={() => setPage(p => p + 1)}>
                                Показати ще
                            </button>
                        )
                    }
                </div>
                :
                <span className='empthyFavourite'>
                    У вас ще немає вподобаних товарів.
                </span>
            }
        </>
    );
};

export default Favourite;