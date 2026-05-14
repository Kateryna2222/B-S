import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications, createNotifications } from "../../store/notification/notificationSlice.js";
import Notification from "../../components/Notification/Notification.jsx";
import Loading from "../../components/Loading/Loading.jsx";

const NotificationPage = () => {
    const dispatch = useDispatch();
    const {notifications, isLoading} = useSelector(state => state.notification);
    const {user} = useSelector(state => state.user)

    useEffect(()=>{
        dispatch(getNotifications())
    }, [])

    return (
        <>
            {
                isLoading?
                <Loading/>
                :
                <>
                    {
                        notifications?
                        <div className="notifacationPage">
                            {
                                notifications.map(i => {
                                    return <Notification key={i.id} item={i}/>
                                })
                            }
                        </div>
                        :
                        <div className="notNotifications">
                            У вас ще не має сповіщень
                        </div>
                    }
                    <button onClick={()=>{
                                dispatch(
                                    createNotifications({
                                    title: 'Нове замовлення',
                                    message: 'Копистувач замовив',
                                    userId: user?.id
                                })
                                )
                            }}>
                                click
                            </button>
                </>
            }
        </>
    );
};

export default NotificationPage;