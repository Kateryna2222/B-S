import './UserPage.scss';

import { useRef } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const UserPage = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user)

    const fileInputRef = useRef(null);
    const handleDivClick = () => {
        fileInputRef.current.click(); 
    };

    const [formValues, setFormValues] = useState({
        username: user.username,
        oldPassword: '',
        newPassword: '',
        email: user.email,
        phoneNumber: user.phoneNumber,
        avatar: `http://localhost:3000/users/443be750-0ee7-49e2-bdcf-e926b7acce83.jpg`
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
        <div className="userForm">
            <h5>Ваша сторінка</h5>
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
                    <label className='hint'>І'мя користувача:</label>
                    <input type="text" id='username' placeholder='username'
                        value={formValues.username}
                        onChange={e => handleFormValue(e, 'username')}
                    />
                </div>
                <div>
                    <label className='hint'>Номер телефону:</label>
                    <input type="text" id='phoneNumber' placeholder='+380...'
                        value={formValues.phoneNumber}
                        onChange={e => handleFormValue(e, 'phoneNumber')}
                    />
                </div>
                <div>
                    <label className='hint'>Електронна адреса:</label>
                    <input type="email" id='email' value={formValues.email} disabled/>
                </div>
                <div>
                    <label className='hint changePassword'>Бажаєте змінити пароль?</label>
                    <label className='hint'>Введіть старий пароль:</label>
                    <input type="password" id='oldPassword' className='password'
                        value={formValues.oldPassword}
                        onChange={e => handleFormValue(e, 'oldPassword')}
                    />
                </div>
                <div>
                    <label className='hint'>Введіть новий пароль:</label>
                    <input type="password" id='newPassword' className='password'
                        value={formValues.newPassword}
                        onChange={e => handleFormValue(e, 'newPassword')}
                    />
                </div>
                <button type='button' className='submit'>
                        зберегти зміни
                </button>
            </form>
        </div>
    );
};

export default UserPage;

