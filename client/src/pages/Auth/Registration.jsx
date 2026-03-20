import './Registration.scss';

import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { register } from '../../store/authSlice.js';
import { handleSubmit } from './handleSubmit.js';
import { scrollToTop } from '../../utils/scrollToTop.js';

const Registration = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fileInputRef = useRef(null);
    const handleDivClick = () => {
        fileInputRef.current.click(); 
    };

    const [formValues, setFormValues] = useState({
        username: '',
        password: '',
        email: '',
        phoneNumber: '',
        avatar: null
    });

    const [avatarPreview, setAvatarPreview] = useState('');

    const handleFormValue = (e, keyName) => {
        if(keyName === 'avatar'){
            const file = e.target.files[0];
            setFormValues({...formValues, [keyName]: file})
            setAvatarPreview(URL.createObjectURL(file))
        }
        else{
            setFormValues({...formValues, [keyName]: e.target.value})
        }
    }


    return (
        <div className="registration">
            <h5>Реєстрація</h5>
            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className='fileUpload'>
                    <div className='file' onClick={handleDivClick}>
                        {avatarPreview? <img src={avatarPreview} alt='avatar preview'/> : null}
                    </div>
                    <input type="file" accept='image' id='avatar'
                        ref={fileInputRef}
                        onChange={e => handleFormValue(e, 'avatar')}
                    />
                </div>
                <div>
                    <label className='hint'>Введіть і'мя користувача:</label>
                    <input type="text" id='username' placeholder='username'
                        value={formValues.username}
                        onChange={e => handleFormValue(e, 'username')}
                    />
                </div>
                <div>
                    <label className='hint'>Введіть ваш номер телефону:</label>
                    <input type="text" id='phoneNumber' placeholder='+380...'
                        value={formValues.phoneNumber}
                        onChange={e => handleFormValue(e, 'phoneNumber')}
                    />
                </div>
                <div>
                    <label className='hint'>Введіть вашу електронну адресу:</label>
                    <input type="email" id='email' placeholder='example@gmail.com'
                        value={formValues.email}
                        onChange={e => handleFormValue(e, 'email')}
                    />
                </div>
                <div>
                    <label className='hint'>Введіть пароль (мінімум 8 символів):</label>
                    <input type="password" id='password' placeholder='password' className='password'
                        value={formValues.password}
                        onChange={e => handleFormValue(e, 'password')}
                    />
                </div>
                <button type='button' 
                        onClick={()=>handleSubmit(formValues, 'registration', register, dispatch, navigate)}>
                    зареєструватись
                </button>
            </form>
            <div className="changeLink">
                <span>Вже маєте акаунт?</span>
                <Link to={'/auth/login'} onClick={scrollToTop}>
                    ввійти
                </Link>
            </div>

        </div>
    );
};

export default Registration;
