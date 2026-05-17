import './Header.scss'
import iconFavorites from '../../assets/favorites.svg';
import iconNotifications from '../../assets/notification.svg';
import iconChat from '../../assets/chat.svg';
import iconPosts from '../../assets/plus.svg';

import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../../store/user/authFunctions.js';
import { clearFavouriteProducts } from '../../store/favourite/favouriteSlice.js';


const Header = () => {

    const {isAuth} = useSelector(state => state.user);
    const {unReadCount} = useSelector(state => state.notification);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const logoutHandler = async () => {
        try {
            await dispatch(logout()).unwrap();
            dispatch(clearFavouriteProducts());
            navigate('/')
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <header className="header">
            <ul className="wrapper">
                <li>
                    <Link to={'/'} className='logo'>B&S</Link>
                </li>
                <li>
                    <ul className='icons'>
                        <li>
                            <Link to={'/favourites'}>
                                <img src={iconFavorites} alt="Обрані" />
                            </Link>
                        </li>
                        <li>
                            <Link to={'/chats'}>
                                <img src={iconChat} alt="Чат" />
                            </Link>
                        </li>
                        <li className='notificationIcon'>
                            <Link to={'/notification'}>
                                <img src={iconNotifications} alt="Сповіщення" />
                            </Link>
                            {
                                unReadCount > 0?
                                <div className={'count'}>{unReadCount}</div>
                                :
                                null
                            }
                        </li>
                    </ul>
                </li>
                <li>
                    <Link to={`/my-products`}>
                        <img src={iconPosts} alt="Мої пости" className='myPosts'/>
                    </Link>
                </li>
                <li>
                    <Link to={`/me`}>Ваш профіль</Link>
                </li>
                {
                    isAuth?
                    <li>
                        <button onClick={logoutHandler}>Вийти</button>
                    </li>
                    :
                    <li>
                        <Link to={'/auth/login'}>Ввійти</Link>
                    </li>
                }
            </ul>
        </header>
    );
};

export default Header;