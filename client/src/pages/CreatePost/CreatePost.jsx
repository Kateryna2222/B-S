import './CreatePost.scss';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Category from '../../components/Category/Category.jsx';
import ProductGallery from '../../components/ProductGallery/ProductGallery.jsx';
import { createProduct } from '../../store/product/productSlice.js';
import { handleSubmit } from './handleSubmit.js';


const CreatePost = () => {
    const { currentCategory } = useSelector(state => state.category);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [images, setImages] = useState([]);

    const initialState = {
        title: '',
        description: '',
        price: 0.00,
        state: 'new',
        categoryId: null,
        images: []
    }

    const [formValues, setFormValues] = useState(initialState);


    const handleFormValue = (e, keyName) => {
        setFormValues({...formValues, [keyName]: e.target.value})
    }

    useEffect(() => {
        setFormValues(prev => ({ ...prev, images }));
    }, [images]);


    useEffect(() => {
        if (currentCategory?.id) {
            setFormValues(prev => ({
                ...prev,
                categoryId: currentCategory.id
            }));
        }
    }, [currentCategory]);




    return (
        <div className="userForm createPostForm">
            <h5>Нове оголошення</h5>
            <form className="form" onSubmit={e => e.preventDefault()}>
                <ProductGallery images={images} setImages={setImages}/>
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
                    <label className='hint'>Виберіть стан товару:</label>
                    <div className="options">
                        <label className='option'>
                            <input type="radio" name="state" value="new"
                                checked={formValues.state === 'new'}
                                onChange={e => handleFormValue(e, 'state')}/> 
                                нове
                        </label>
                        <label className='option'>
                            <input type="radio" name="state" value="used"
                                checked={formValues.state === 'used'}
                                onChange={e => handleFormValue(e, 'state')}/> 
                                б/у
                        </label>
                    </div>
                </div>
                <button type='button' className='submit' onClick={()=>{
                    handleSubmit(formValues, images, createProduct, dispatch, navigate)
                }}>
                    створити товар
                </button>
            </form>
        </div>
    );
};

export default CreatePost;

