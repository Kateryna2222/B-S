//import { useRef } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Category from '../../components/Category/Category.jsx';
import { updateProduct, getProduct } from '../../store/product/productSlice.js';
import { handleSubmit } from './handleSubmit.js';


const EditPost = () => {
    const { currentCategory } = useSelector(state => state.category);
    const { currentProduct } = useSelector(state => state.product);
    const dispatch = useDispatch();
    const {id} = useParams();


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
        }
    }, [currentProduct]);


    return (
        <div className="userForm">
            <h5>Редагувати оголошення</h5>
            <form className="form" onSubmit={e => e.preventDefault()}>
                <div>
                    <Category/>
                </div>
                <div>
                    <label className='hint'>Назва:</label>
                    <input type="text" id='title' placeholder='назва'
                        value={formValues.title}
                        onChange={e => handleFormValue(e, 'title')}
                    />
                </div>
                <div>
                    <label className='hint'>Опис:</label>
                    <textarea id='description'
                        placeholder='Напишіть опис товару...'
                        value={formValues.description}
                        onChange={e => handleFormValue(e, 'description')}
                    ></textarea>
                </div>
                <div>
                    <label className='hint'>Ціна:</label>
                    <input type="number" id='price' 
                        value={formValues.price}
                        onChange={e => handleFormValue(e, 'price')}/>
                    <span>грн</span>
                </div>
                <div>
                    <label className='hint'>Стан товару:</label>
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
                <button type='button' className='submit' onClick={()=>{
                    handleSubmit({id, payload: formValues}, updateProduct, dispatch)
                }}>
                    зберегти зміни
                </button>
            </form>
        </div>
    );
};

export default EditPost;

