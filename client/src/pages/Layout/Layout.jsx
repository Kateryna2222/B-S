import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";

import Header from '../../components/Header/Header.jsx'
import { checkAuth } from "../../store/user/authFunctions.js";
import { storage } from "../../storage/storage.js";

const Layout = () => {

    const dispatch = useDispatch();
    const {pathName} = useLocation();

    useEffect(()=>{
        if(storage.getItem('accessToken')){
            dispatch(checkAuth())
            console.log('token access upfate')
        }
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, [dispatch, pathName])


    return (
        <>
            <Header/>
            <div className="container">
                <Outlet/>
                <ToastContainer position="top-center"/>
            </div>
        </>
    );
};

export default Layout;
