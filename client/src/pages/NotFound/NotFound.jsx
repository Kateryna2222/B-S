import './NotFound.scss';

import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="notFound">
            <span>404</span>
            <h5>Сторінку не знайдено...</h5>
            <Link to='./'>
                повернутись на головну
            </Link>
        </div>
    );
};

export default NotFound;