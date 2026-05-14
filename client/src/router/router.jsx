import { createBrowserRouter, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Layout from "../pages/Layout/Layout.jsx";
import Home from "../pages/Home/Home.jsx";
import NotFound from "../pages/NotFound/NotFound.jsx";
import Loading from "../components/Loading/Loading.jsx";

import AdminPage from "../pages/AdminPage/AdminPage.jsx";

import Registration from "../pages/Auth/Registration.jsx";
import UserPage from "../pages/User/UserPage.jsx";
import Login from "../pages/Auth/Login.jsx";
import Recover from "../pages/Auth/Recover.jsx";
import RegistrationSubmitPage from "../pages/Auth/RegistrationSubmit.jsx";

import UserPosts from "../pages/UserPosts/UserPosts.jsx";
import EditPost from "../pages/EditPost/EditPost.jsx";
import CreatePost from "../pages/CreatePost/CreatePost.jsx";
import PostPage from "../pages/PostPage/PostPage.jsx";
import SellerPage from "../pages/SellerPage/SellerPage.jsx";

import Favourite from "../pages/Favourite/Favourite.jsx";
import ChatsPage from "../pages/ChatsPage/ChatsPage.jsx";
import ChatPage from "../pages/ChatPage/ChatPage.jsx";
import NotificationPage from "../pages/NotificationPage/NotificationPage.jsx";

import CreateOrderPage from "../pages/CreateOrderPage/CreateOrderPage.jsx";

const ProtectedRoute = ({element}) => {
    const {isAuth, isLoading} = useSelector(state => state.user)
    if (isLoading) {
        return <Loading/>
    }
    return isAuth? element : <Navigate to='/auth/login' replace/>
}

const ProtectedAdminRoute = ({element}) => {
    const {isAuth, isLoading, user} = useSelector(state => state.user)
    if (isLoading) {
        return <Loading/>
    }
    if(!isAuth){
        return <Navigate to='/auth/login' replace/>
    }
    if(user?.role !== 'ADMIN'){
        return <Navigate to='/' replace/>
    }
    return element 
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
                path: "/my-products/edit/:id",
                element: <ProtectedRoute element={<EditPost/>}/>
            },
            {
                path: "/products/:id",
                element: <PostPage/>
            },
            {
                path: "/favourites",
                element: <ProtectedRoute element={<Favourite/>}/>
            },
            {
                path: "/seller/:id",
                element: <SellerPage/>
            },
            {
                path: "/chats",
                element: <ProtectedRoute element={<ChatsPage/>}/>
            },
            {
                path: "/chats/:id",
                element: <ProtectedRoute element={<ChatPage/>}/>
            },
            {
                path: "/admin",
                element: <ProtectedAdminRoute element={<AdminPage/>}/>
            },
            {
                path: "/notification",
                element: <ProtectedRoute element={<NotificationPage/>}/>
            },
            {
                path: "/order/:productId/create",
                element: <ProtectedRoute element={<CreateOrderPage/>}/>
            },
        ]

    }
])
