import { Outlet } from "react-router-dom";
//import { ToastContainer } from 'react-toastify';
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Header from '../../components/Header/Header.jsx'
import { checkAuth } from "../../store/authSlice.js";
import { storage } from "../../storage/storage.js";

const Layout = () => {

    const dispatch = useDispatch();

    useEffect(()=>{
        if(storage.getItem('accessToken')){
            dispatch(checkAuth())
        }
    }, [dispatch])

    return (
        <>
            <Header/>
            <div className="container">
                <Outlet/>
            </div>
        </>
    );
};

export default Layout;

//<ToastContainer position="top-center"/>