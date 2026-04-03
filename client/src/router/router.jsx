import { createBrowserRouter, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Layout from "../pages/Layout/Layout.jsx";
import Home from "../pages/Home/Home.jsx";
import NotFound from "../pages/NotFound/NotFound.jsx";
import Loading from "../components/Loading/Loading.jsx";

import Registration from "../pages/Auth/Registration.jsx";
import UserPage from "../pages/User/UserPage.jsx";
import Login from "../pages/Auth/Login.jsx";
import Recover from "../pages/Auth/Recover.jsx";
import RegistrationSubmitPage from "../pages/Auth/RegistrationSubmit.jsx";

import UserPosts from "../pages/UserPosts/UserPosts.jsx";
import EditPost from "../pages/EditPost/EditPost.jsx";
import CreatePost from "../pages/CreatePost/CreatePost.jsx";

const ProtectedRoute = ({element}) => {
    const {isAuth, isLoading} = useSelector(state => state.user)
    if (isLoading) {
        return <Loading/>
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
            },
            {
                path: "/my-products",
                element: <ProtectedRoute element={<UserPosts/>}/>
            },
            {
                path: "/my-products/create",
                element: <ProtectedRoute element={<CreatePost/>}/>
            },
            {
                path: "/my-products/edit",
                element: <ProtectedRoute element={<EditPost/>}/>
            }
        ]

    }
])
