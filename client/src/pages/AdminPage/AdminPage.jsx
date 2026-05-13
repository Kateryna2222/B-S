import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUsers } from "../../store/admin/adminSlice.js";
import Loading from "../../components/Loading/Loading.jsx";
import UserInfo from "../../components/UserInfo/UserInfo.jsx";

const AdminPage = () => {

    const dispatch = useDispatch();
    const { isLoading, users } = useSelector(state => state.admin);

    useEffect(()=>{
        dispatch(getUsers())
    }, [dispatch])

    return (
        <>
            {
                isLoading?
                <Loading/>
                :
                <>
                    {
                        users.length?
                        <ul className="users">
                            {
                                users.map(user => {
                                    return <UserInfo key={user.id} user={user}/>
                                })
                            }
                        </ul>
                        :
                        <p className="userNotFound">Користувачів не знайдено.</p>
                    }
                </>
            }
        </>
    );
};

export default AdminPage;