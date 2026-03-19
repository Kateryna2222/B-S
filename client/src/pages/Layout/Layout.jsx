import { Outlet } from "react-router-dom";
import Header from '../../components/Header/Header.jsx'
//import { ToastContainer } from 'react-toastify';

const Layout = () => {
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