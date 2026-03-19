import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {login} from '../../../store/authSlice.js';

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
        dispatch(login(formValues))
    }

    useEffect(()=>{}, [dispatch])

    return (
        <div className="registration">
            <h5>Вхід</h5>
            <form className="form" onSubmit={e => e.preventDefault()}>
                <div>
                    <label className="hint">
                        Введіть вашу електронну адресу:
                    </label>
                    <input type="email" id='email' placeholder='exapmle@gmail.com'
                        value={formValues.email}
                        onChange={e => handleFormValue(e, 'email')}
                    />
                </div>
                <div>
                    <label className="hint">
                        Введіть пароль:
                    </label>
                    <input type="password" id='password' placeholder='password'
                        value={formValues.password}
                        onChange={e => handleFormValue(e, 'password')}
                    />
                </div>
                <button type='button' onClick={submit}>ввійти</button>
            </form>
            <div className="changeLink">
                <span>Не зареєстровані?</span>
                <Link to={'/auth/registration'}>
                    зареєструватись
                </Link>
            </div>
        
        </div>
    );
};

export default Login;
