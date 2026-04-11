//import { useRef } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Category from '../../components/Category/Category.jsx';
import { createProduct } from '../../store/product/productSlice.js';
import { handleSubmit } from './handleSubmit.js';


const CreatePost = () => {
    const { currentCategory } = useSelector(state => state.category);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    //img
    // const fileInputRef = useRef(null);
    // const handleDivClick = () => {
    //     fileInputRef.current.click(); 
    // };
    // const [avatarPreview, setAvatarPreview] = useState('');

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
        if (currentCategory?.id) {
            setFormValues(prev => ({
                ...prev,
                categoryId: currentCategory.id
            }));
        }
    }, [currentCategory]);




    return (
        <div className="userForm">
            <h5>Нове оголошення</h5>
            <form className="form" onSubmit={e => e.preventDefault()}>
                {/* <div className='fileUpload'>
                    <div className='file' onClick={handleDivClick}>
                        <img src={avatarPreview || `http://localhost:3000/users/${formValues.avatar}`}  alt='avatar preview'/>
                    </div>
                    <input type="file" accept='image' id='avatar'
                        ref={fileInputRef}
                        onChange={e => handleFormValue(e, 'avatar')}
                    />
                </div> */}
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
                    <label className='hint'>Виберіть стан товару:</label>
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
                    handleSubmit(formValues, createProduct, dispatch)
                    navigate('/')
                }}>
                    створити товар
                </button>
            </form>
        </div>
    );
};

export default CreatePost;

