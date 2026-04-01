import './Header.scss'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../../store/user/authFunctions.js';

const Header = () => {

    const {isAuth} = useSelector(state => state.user)
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const logoutHandler = async () => {
        try {
            await dispatch(logout()).unwrap()
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
                    <Link to={'/'}>Головна</Link>
                </li>
                <li>
                    <Link to={'/favorites'}>Обрані</Link>
                </li>
                <li>
                    <Link to={'/chat'}>Чат</Link>
                </li>
                <li>
                    <Link to={'/notification '}>Сповіщення</Link>
                </li>
                {
                    isAuth?
                    <>
                        <li>
                            <Link to={`/me`}>Ваш профіль</Link>
                        </li>
                        <li>
                            <button onClick={logoutHandler}>Logout</button>
                        </li>
                    </>
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