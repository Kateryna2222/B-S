import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Header.scss'

const Header = () => {

    return (
        <header className="header">
            <div className="wrapper">
                <span className='logo'>B&S</span>
            </div>
        </header>
    );
};

export default Header;