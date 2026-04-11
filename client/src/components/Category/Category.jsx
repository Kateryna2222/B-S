import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCategories, changeCategory } from "../../store/category/categorySlice.js";


const Category = () => {

    const dispatch = useDispatch();
    const { categories, parentCategories, isLoading, isLoaded } = useSelector(state => state.category)

    useEffect(()=>{
        if(!isLoaded && categories.length === 0){
            dispatch(getCategories())
        }
    }, [dispatch])

    const [selectedParentId, setSelectedParentId] = useState(null);

    return (
        <>
            {
                isLoading? 
                <span>LOADING</span>
                :
                <div className="categoriesWrapper">
                    <ul className="categories">
                        {
                            parentCategories?.map(category => {
                                return <li key={category.id}>
                                    <button onClick={()=>{
                                        dispatch(changeCategory(category.id))
                                        setSelectedParentId(category.id)}
                                    }>
                                        {category.name}
                                    </button>
                                </li>
                            })
                        }
                    </ul>
                    {
                        selectedParentId?
                        <ul className="categories">
                            {
                                categories?.filter(category => category.parent_id === selectedParentId)
                                .map(category => (
                                    <li key={category.slug}>
                                        <button onClick={() => dispatch(changeCategory(category.id))}>
                                            {category.name}
                                        </button>
                                    </li>
                                ))
                            } 
                        </ul>
                        :
                        null
                    }
                </div>
            }
        </>
    );
};

export default Category;