import { useDispatch, useSelector } from "react-redux";

import { setRating } from "../../store/rating/ratingSlice.js";

const Rating = ({count = 0, sellerId, size = 22}) => {
    const rating = Math.round(parseFloat(count));

    const dispatch = useDispatch();
    const {user} = useSelector(state => state.user);

    return (
        <div>
            {[1, 2, 3, 4, 5].map(star => (
                <button
                    key={star}
                    style={{ color: star <= rating ? '#f59e0b' : '#a9acb1', fontSize: size }}
                    onClick={()=>dispatch(setRating({sellerId, rating: star}))}
                    disabled={user?.id === sellerId}
                >
                &#9733;
                </button>
            ))}
        </div>
    );
};

export default Rating;