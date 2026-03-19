import './Registration.scss';

import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {register} from '../../../store/authSlice.js';

const Registration = () => {
    const dispatch = useDispatch();

    const fileInputRef = useRef(null);
    const handleDivClick = () => {
        fileInputRef.current.click(); 
    };

    const [formValues, setFormValues] = useState({
        username: '',
        password: '',
        email: '',
        avatar: null,
        phoneNumber: ''
    });

    const handleFormValue = (e, keyName) => {
        setFormValues({...formValues, [keyName]: e.target.value})
    }

    const submit = () => {
        dispatch(register(formValues));
    }

    useEffect(()=>{}, [dispatch])

    return (
        <div className="registration">
            <h5>Реєстрація</h5>
            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className='fileUpload'>
                    <div className='file' onClick={handleDivClick}></div>
                    <input type="file" accept='image' id='avatar'
                        ref={fileInputRef}
                        value={formValues.avatar}
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
                <button type='button' onClick={submit}>зареєструватись</button>
            </form>
            <div className="changeLink">
                <span>Вже маєте акаунт?</span>
                <Link to={'/auth/login'}>
                    ввійти
                </Link>
            </div>

        </div>
    );
};

export default Registration;
