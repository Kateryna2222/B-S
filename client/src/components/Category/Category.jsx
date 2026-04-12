import './Category.scss';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCategories, changeCategory } from "../../store/category/categorySlice.js";


const Category = (green) => {

    const dispatch = useDispatch();
    const { categories, parentCategories, isLoading, isLoaded } = useSelector(state => state.category)

    useEffect(()=>{
        if(!isLoaded && categories.length === 0){
            dispatch(getCategories())
        }
    }, [dispatch])

    const [selectedParentId, setSelectedParentId] = useState(null);

    const [activeCategoryBtn, setActiveCategoryBtn] = useState(null);
    const [activeSubCategoryBtn, setActiveSubCategoryBtn] = useState(null);

    return (
        <>
            {
                isLoading? 
                <span>LOADING</span>
                :
                <div className="categoriesWrapper">
                    <h4>Доступні розділи:</h4>
                    <ul className="categories">
                        {
                            parentCategories?.map(category => {
                                return <li key={category.id}>
                                    <button 
                                        className={activeCategoryBtn === category.id? 'active' : ''}
                                        onClick={()=>{
                                            dispatch(changeCategory(category.id))
                                            setSelectedParentId(category.id)
                                            setActiveCategoryBtn(category.id)}
                                        }>
                                        {category.name}
                                    </button>
                                </li>
                            })
                        }
                    </ul>
                    {
                        selectedParentId?
                        <>
                            <p>Категорії</p>
                            <ul className="subcategories">
                                {
                                    categories?.filter(category => category.parent_id === selectedParentId)
                                    .map(category => (
                                        <li key={category.slug}>
                                            <button 
                                                className={activeSubCategoryBtn === category.id? 'active' : ''}
                                                onClick={() => {
                                                    dispatch(changeCategory(category.id))
                                                    setActiveSubCategoryBtn(category.id)
                                                }}>
                                                {category.name}
                                            </button>
                                        </li>
                                    ))
                                } 
                            </ul>
                        </>
                        :
                        null
                    }
                </div>
            }
        </>
    );
};

export default Category;