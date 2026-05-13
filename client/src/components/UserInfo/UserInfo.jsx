import './UserInfo.scss';
import { useDispatch } from "react-redux";
import { blockUser, unBlockUser, changeUserRole } from "../../store/admin/adminSlice.js";


const UserInfo = ({user}) => {

    const dispatch = useDispatch();
    const roleToChange = user.role === 'ADMIN'? 'USER':'ADMIN';

    return (
        <li className="user">
            <div className="info">
                <div className="text">
                    <div className="id">ID:</div>
                    <div className="username">Користувач:</div>
                    <div className="email">Пошта:</div>
                    <div className="number">Номер телефону:</div>
                    <div className="role">Роль:</div>
                    <div className="status">Статус акаунту:</div>
                </div>
                <ul className="data">
                    <li className="id">{user.id}</li>
                    <li>{user.username}</li>
                    <li>{user.email}</li>
                    <li>{user.phoneNumber}</li>
                    <li>{user.role === 'ADMIN'? 'адміністратор':'користувач'}</li>
                    <li>{user.isActivated? 'акивний': 'заблокований'}</li>
                </ul>
            </div>
            <div className="buttons">
                <button onClick={()=>dispatch(changeUserRole({id: user.id, role: roleToChange}))}>
                    змінити роль
                </button>
                {
                    user.isActivated?
                    <button onClick={()=>dispatch(blockUser(user.id))}>
                        заблокувати
                    </button>
                    :
                    <button onClick={()=>dispatch(unBlockUser(user.id))}>
                        розблуковати
                    </button>
                }
            </div>
        </li>
    );
};

export default UserInfo;