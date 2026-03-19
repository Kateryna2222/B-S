

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {register} from '../../../store/authSlice.js';

const Login = () => {
    const dispatch = useDispatch();

    const [formValues, setFormValues] = useState({
        password: '',
        email: ''
    });

    const handleFormValue = (e, keyName) => {
        setFormValues({...formValues, [keyName]: e.target.value})
    }

    const submit = () => {
        console.log(formValues)
    }

    useEffect(()=>{}, [dispatch])

    return (
        <div className="registration">
            <h5>Вхід</h5>
            <form className="form" onSubmit={e => e.preventDefault()}>
                <input type="email" id='email'
                    value={formValues.email}
                    onChange={e => handleFormValue(e, 'email')}
                />
                <input type="password" id='password'
                    value={formValues.password}
                    onChange={e => handleFormValue(e, 'password')}
                />
                <button type='button' onClick={submit}>ввійти</button>
            </form>
            <span className="changeLink">
                Не зареєстровані?
            </span>
            <Link to={'/auth/registration'}>
                зареєструватись
            </Link>
        </div>
    );
};

export default Login;
