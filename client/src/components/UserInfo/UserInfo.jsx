import { useDispatch } from "react-redux";
import { blockUser, unBlockUser, changeUserRole } from "../../store/admin/adminSlice.js";


const UserInfo = ({user}) => {

    const dispatch = useDispatch();
    const roleToChange = user.role === 'ADMIN'? 'USER':'ADMIN';

    return (
        <li className="user">
            <div className="info">
                <div className="id">
                    ID:{user.id}
                </div>
                <div className="username">
                    Користувач: {user.username}
                </div>
                <div className="email">
                    Пошта:{user.email}
                </div>
                <div className="role">
                    Роль: {user.role === 'ADMIN'? 'адміністратор':'користувач'}
                </div>
                <div className="number">
                    Номер телефону: {user.phoneNumber}
                </div>
                <div className="status">
                    Статус акаунту: {user.isActivated? 'акивний': 'заблокований'}
                </div>
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