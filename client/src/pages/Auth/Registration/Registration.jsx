import './Registration.scss';

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {register, logout} from '../../../store/authSlice.js';

const Registration = () => {
    const dispatch = useDispatch();

    const [formValues, setFormValues] = useState({
        username: '',
        password: '',
        email: '',
        //avatar: null,
        phoneNumber: ''
    });

    const handleFormValue = (e, keyName) => {
        setFormValues({...formValues, [keyName]: e.target.value})
    }

    const submit = () => {
        dispatch(register(formValues));
    }
    const out = () => {
        dispatch(logout());
    }

    useEffect(()=>{}, [dispatch])

    return (
        <div className="registration">
            <h5>Реєстрація</h5>
            <form className="form" onSubmit={e => e.preventDefault()}>

                <input type="text" id='username' 
                    value={formValues.username}
                    onChange={e => handleFormValue(e, 'username')}
                />
                <input type="text" id='phoneNumber'
                    value={formValues.phoneNumber}
                    onChange={e => handleFormValue(e, 'phoneNumber')}
                />
                <input type="email" id='email'
                    value={formValues.email}
                    onChange={e => handleFormValue(e, 'email')}
                />
                <input type="password" id='password'
                    value={formValues.password}
                    onChange={e => handleFormValue(e, 'password')}
                />
                <button type='button' onClick={submit}>зареєструватись</button>
            </form>
            <button type='button' onClick={out}>logout</button>
            <span className="changeLink">
                Вже маєте акаунт?
            </span>
            <Link to={'/auth/login'}>
                ввійти
            </Link>
        </div>
    );
};

export default Registration;

{/* <input type="file" accept='image' id='avatar'
                    value={formValues.avatar}
                    onChange={e => handleFormValue(e, 'avatar')}
                /> */}