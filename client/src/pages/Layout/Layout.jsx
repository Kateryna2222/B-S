import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";

import Header from '../../components/Header/Header.jsx'
import { checkAuth } from "../../store/user/authFunctions.js";

const Layout = () => {

    const dispatch = useDispatch();
    const {pathname} = useLocation();

    useEffect(()=>{
        dispatch(checkAuth())
    }, [dispatch])

    useEffect(()=>{
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, [pathname])


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
