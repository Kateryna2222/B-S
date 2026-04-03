import './UserPage.scss';

import { useRef } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { upadateUser, deleteUser } from '../../store/user/userFunction.js';
import { handleSubmit } from './handleSubmit.js';

const UserPage = () => {
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const fileInputRef = useRef(null);
    const handleDivClick = () => {
        fileInputRef.current.click(); 
    };

    const [showDeleteButton, setShowDeleteButton] = useState(false);

    const [formValues, setFormValues] = useState({
        username: '',
        oldPassword: '',
        newPassword: '',
        email: '',
        phoneNumber: '',
        avatar: ''
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



    useEffect(() => {
        if (user) {
        setFormValues({
            username: user.username,
            oldPassword: '',
            newPassword: '',
            email: user.email,
            phoneNumber: user.phoneNumber,
            avatar: user.avatar
        });
        }
    }, [user]);

    return (
        <div className="userForm">
            <h5>Ваш профіль</h5>
            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className='fileUpload'>
                    <div className='file' onClick={handleDivClick}>
                        <img src={avatarPreview || `http://localhost:3000/users/${formValues.avatar}`}  alt='avatar preview'/>
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
                    <input type="email" id='email' value={formValues.email} disabled className='unable'/>
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
                <button type='button' className='submit' onClick={()=>handleSubmit(formValues, upadateUser, dispatch)}>
                        зберегти зміни
                </button>
                <div className='deleteWrapper'>
                    <button className='delete' onClick={()=>setShowDeleteButton(showDeleteButton === true? false : true)}>
                        Видалити обліковий запис?
                    </button>
                    {
                        showDeleteButton? 
                        <button className='delete' onClick={()=>dispatch(deleteUser())}>
                            видалити
                        </button>
                        :
                        null
                    }
                </div>
            </form>
        </div>
    );
};

export default UserPage;

