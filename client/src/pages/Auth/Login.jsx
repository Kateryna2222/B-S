import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { login } from '../../store/user/authFunctions.js';
import { sendEmailForRecoverPassword } from '../../store/user/userFunction.js';
import { handleSubmit, sendMail } from './handleSubmit.js';
import { scrollToTop } from '../../utils/scrollToTop.js';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        password: '',
        email: ''
    });

    const handleFormValue = (e, keyName) => {
        setFormValues({...formValues, [keyName]: e.target.value})
    }


    return (
        <div className="userForm">
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
                    <button className='recover' 
                            onClick={()=>sendMail(formValues, sendEmailForRecoverPassword, dispatch)}>
                        Забули пароль?
                    </button>
                </div>
                <button type='button' className='submit'
                        onClick={()=>handleSubmit(formValues, 'login', login, dispatch, navigate)}>
                    ввійти
                </button>
            </form>
            <div className="changeLink">
                <span>Не зареєстровані?</span>
                <Link to={'/auth/registration'} onClick={scrollToTop}>
                    зареєструватись
                </Link>
            </div>
        
        </div>
    );
};

export default Login;
