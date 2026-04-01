import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { handleSubmitRecover } from './handleSubmit.js';
import { recoverPassword } from '../../store/user/userFunction.js';

const Recover = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { link } = useParams();

    const [passwords, setPasswords] = useState({
        password: '',
        passwordRepeat: ''
    });

    const handleFormValue = (e, keyName) => {
        setPasswords({...passwords, [keyName]: e.target.value})
    }

    return (
        <div className="userForm">
            <h5>Встановити новий пароль</h5>
            <form className="form" onSubmit={e => e.preventDefault()}>
                <div>
                    <label className="hint">
                        Введіть новий пароль:
                    </label>
                    <input type="password" id='password'
                        value={passwords.password}
                        onChange={e => handleFormValue(e, 'password')}
                    />
                </div>
                <div>
                    <label className="hint">
                        Введіть новий пароль ще раз:
                    </label>
                    <input type="password" id='passwordRepeat'
                        value={passwords.passwordRepeat}
                        onChange={e => handleFormValue(e, 'passwordRepeat')}
                    />
                </div>
                <button type='button' className='submit'
                        onClick={()=>handleSubmitRecover(passwords, link, recoverPassword, dispatch, navigate)}>
                    підтвердити
                </button>
            </form>
        </div>
    );
};

export default Recover;
