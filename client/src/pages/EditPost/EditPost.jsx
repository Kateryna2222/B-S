import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Category from '../../components/Category/Category.jsx';
import ProductGallery from '../../components/ProductGallery/ProductGallery.jsx';
import ImagesSlider from '../../components/ImagesSlider/ImagesSlider.jsx';
import { updateProduct, getProduct } from '../../store/product/productSlice.js';
import { handleSubmit } from './handleSubmit.js';


const EditPost = () => {
    const dispatch = useDispatch();
    
    const { currentProduct } = useSelector(state => state.product);
    const {id} = useParams();

    const { currentCategory } = useSelector(state => state.category);

    const [images, setImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const initialState = {
        title: '',
        description: '',
        price: 0.00,
        state: 'new',
        categoryId: null
    }

    const [formValues, setFormValues] = useState(initialState);
    const handleFormValue = (e, keyName) => {
        setFormValues({...formValues, [keyName]: e.target.value})
    }

    useEffect(() => {
        dispatch(getProduct(id))
    }, [dispatch]);


    useEffect(() => {
        if (currentCategory?.id) {
            setFormValues(prev => ({
                ...prev,
                categoryId: currentCategory.id
            }));
        }
    }, [currentCategory]);


    useEffect(() => {
        if (currentProduct) {
            setFormValues({
                title: currentProduct.title,
                description: currentProduct.description,
                price: currentProduct.price,
                state: currentProduct.state,
                categoryId: currentProduct.categoryId
            });
            setImages(
                currentProduct.images.map(img => ({
                    preview: `http://localhost:3000/products/${img.image_url}`
                }))
            );
        }
    }, [currentProduct]);


    return (
        <div className="userForm createPostForm">
            <h5>Редагувати оголошення</h5>
            <form className="form" onSubmit={e => e.preventDefault()}>
                <ImagesSlider images={images} setImages={setImages} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex}/>
                <div>
                    <Category/>
                </div>
                <div className='title'>
                    <label className='hint'>Назва:</label>
                    <input type="text" id='title' placeholder='назва'
                        value={formValues.title}
                        onChange={e => handleFormValue(e, 'title')}
                    />
                </div>
                <div className='price'>
                    <label className='hint'>Ціна:</label>
                    <input type="number" id='price' 
                        value={formValues.price}
                        onChange={e => handleFormValue(e, 'price')}/>
                    <span>грн</span>
                </div>
                <div className='info'>
                    <label className='hint'>Опис:</label>
                    <textarea id='description'
                        placeholder='Напишіть опис товару...'
                        value={formValues.description}
                        onChange={e => handleFormValue(e, 'description')}
                    ></textarea>
                </div>
                <div className='state'>
                    <label className='hint'>Стан товару:</label>
                    <div className="options">
                        <label>
                            <input type="radio" name="state" value="new"
                                checked={formValues.state === 'new'}
                                onChange={e => handleFormValue(e, 'state')}/> 
                                нове
                        </label>
                        <label>
                            <input type="radio" name="state" value="used"
                                checked={formValues.state === 'used'}
                                onChange={e => handleFormValue(e, 'state')}/> 
                                б/у
                        </label>
                    </div>
                </div>
                <button type='button' className='submit' onClick={()=>{
                    handleSubmit({id, payload: {...formValues, images}}, updateProduct, dispatch)
                }}>
                    зберегти зміни
                </button>
            </form>
        </div>
    );
};

export default EditPost;

