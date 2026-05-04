import { useDispatch, useSelector } from "react-redux";
import { setRating } from "../../store/rating/ratingSlice.js";
import { getSeller } from "../../store/product/productSlice.js";

const Rating = ({count = 0, sellerId, size = 22, disabled = true}) => {
    const rating = Math.round(parseFloat(count));

    const dispatch = useDispatch();
    const {user} = useSelector(state => state.user);

    const handleClick = async (star) => {
        await dispatch(setRating({ sellerId, rating: star }));
        dispatch(getSeller(sellerId));
    };

    return (
        <div>
            {[1, 2, 3, 4, 5].map(star => (
                <button
                    key={star}
                    style={{ color: star <= rating ? '#f59e0b' : '#a9acb1', fontSize: size }}
                    onClick={()=>handleClick(star)}
                    disabled={(user?.id === sellerId) || disabled}
                >
                &#9733;
                </button>
            ))}
        </div>
    );
};

export default Rating;