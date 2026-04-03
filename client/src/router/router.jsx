import { createBrowserRouter, Navigate } from "react-router-dom";

import Layout from "../pages/Layout/Layout.jsx";
import Home from "../pages/Home/Home.jsx";
import NotFound from "../pages/NotFound/NotFound.jsx";
import Registration from "../pages/Auth/Registration.jsx";
import UserPage from "../pages/User/UserPage.jsx";
import Login from "../pages/Auth/Login.jsx";
import Recover from "../pages/Auth/Recover.jsx";
import RegistrationSubmitPage from "../pages/Auth/RegistrationSubmit.jsx";
import { useSelector } from "react-redux";

const ProtectedRoute = ({element}) => {
    const {isAuth, isLoading} = useSelector(state => state.user)
    
    if (isLoading) {
        return <div>Loading...</div>
    }
    
    return isAuth? element : <Navigate to='/auth/login' replace/>
}


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        errorElement: <NotFound/>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: "/auth/registration",
                element: <Registration/>
            },
            {
                path: "/auth/registration/submit",
                element: <RegistrationSubmitPage/>
            },
            {
                path: "/auth/login",
                element: <Login/>
            },
            {
                path: "/auth/recover/:link",
                element: <Recover/>
            },
            {
                path: "/me",
                element: <ProtectedRoute element={<UserPage/>}/>
            }
        ]

    }
])
