import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUsers, changePage } from "../../store/admin/adminSlice.js";
import Loading from "../../components/Loading/Loading.jsx";
import UserInfo from "../../components/UserInfo/UserInfo.jsx";
import Search from "../../components/Search/Search.jsx";
import Pagination from "../../components/Pagination/Pagination.jsx";
import SortBox from "../../components/SortBox/SortBox.jsx";

const AdminPage = () => {

    const dispatch = useDispatch();
    const { isLoading, pagination, users } = useSelector(state => state.admin);
    const [activeButton, setActiveButton] = useState('');

    const initialParams = {
        search: '',
        sortDir: 'desc',
        role: '',
        isActivated: ''
    }
    const [params, setParams] = useState(initialParams);

    const handleParams = (key, value) => {
        setParams((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const buildQuery = () => {
        let query = `page=${pagination.page}&limit=2`;

        if (params.search) {
            query += `&search=${params.search}`;
        }

        if (params.role) {
            query += `&role=${params.role}`;
        }

        if (params.sortDir) {
            query += `&sortDir=${params.sortDir}`;
        }

        if (params.isActivated !== '') {
            query += `&isActivated=${params.isActivated}`;
        }

        return query;
    };
    
    useEffect(()=>{
        const query = buildQuery();
        dispatch(getUsers(query))
    }, [dispatch, pagination.page, params.search, params.role, params.sortDir, params.isActivated])
    

    return (
        <>
            <Search onSearch={(value) => {
                setParams(initialParams)
                handleParams("search", value)
            }}/>
            <ul className="filterBtns">
                <li>
                    <button className={activeButton === '' ? 'active' : ''} 
                            onClick={()=>setParams(initialParams)}>
                        Всі
                    </button>
                </li>
                <li>
                    <button className={activeButton === 'USER' ? 'active' : ''} 
                            onClick={()=>handleParams("role", 'USER')}>
                        Корсичтувачі
                    </button>
                </li>
                <li>
                    <button className={activeButton === 'ADMIN' ? 'active' : ''} 
                            onClick={()=>handleParams("role", 'ADMIN')}>
                        Адміністратори
                    </button>
                </li>
                <li>
                    <button className={activeButton === 'sold' ? 'active' : ''} 
                            onClick={()=>handleParams("isActivated", false)}>
                        Заблоковані
                    </button>
                </li>
            </ul>
            <select className='sort'
                value={`${params.sortDir}`}
                onChange={e => handleParams("sortDir", e.target.value)}
            >
                <option value="desc">Спочатку новіші</option>
                <option value="asc">Спочатку старіші</option>
            </select>
            {
                isLoading?
                <Loading/>
                :
                <>
                    {
                        users.length?
                        <>
                            <ul className="users">
                                {
                                    users.map(user => {
                                        return <UserInfo key={user.id} user={user}/>
                                    })
                                }
                            </ul>
                            <Pagination dispatch={dispatch} pagination={pagination} changePage={changePage}/>
                        </>
                        :
                        <p className="userNotFound">Користувачів не знайдено.</p>
                    }
                </>
            }
        </>
    );
};

export default AdminPage;