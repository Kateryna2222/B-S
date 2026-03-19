import { createBrowserRouter, Navigate } from "react-router-dom";

import Layout from "../pages/Layout/Layout.jsx";
import Home from "../pages/Home/Home.jsx";
import NotFound from "../pages/NotFound/NotFound.jsx";
import Registration from "../pages/Auth/Registration/Registration.jsx";
import Login from "../pages/Auth/Login/Login.jsx";

const ProtectedRoute = ({element}) => {
    const token = storage.getItem('token')
    return token? element : <Navigate to='/auth/login' replace/>
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
                path: "/auth/login",
                element: <Login/>
            }
        ]

    }
])
