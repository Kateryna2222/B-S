import './UserPosts.scss';
import { Link } from "react-router-dom";

const UserPosts = () => {
    return (
        <div className="userPosts">
            <div className="create">
                <Link to='/my-products/create'>
                    Додати оголошення
                </Link>
            </div>
            <div className="wrapper">
                <ul className="filter">
                    <li>
                        <button className='active'>
                            Всі
                        </button>
                    </li>
                    <li>
                        <button>
                            В очікуванні
                        </button>
                    </li>
                    <li>
                        <button>
                            Активні
                        </button>
                    </li>
                    <li>
                        <button>
                            Продані
                        </button>
                    </li>
                </ul>
                <ul className="posts">
                    <li>
                        <div className="post">
                            <div className="wrapper">
                                <div className="img"></div>
                                <div className="info">
                                    <span className="title">
                                        Ліжко
                                    </span>
                                    <span className="price">
                                        136 грн
                                    </span>
                                </div>
                            </div>
                            <div className="buttons">
                                {/*/myproducts/ID/edit/*/}
                                <Link to='/my-products/edit' className="edit">
                                    редагувати
                                </Link>
                                <button className="delete">
                                    видалити
                                </button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default UserPosts;