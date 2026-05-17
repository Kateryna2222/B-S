import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications } from "../../store/notification/notificationSlice.js";
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
        <div className="notifacationPage">
            <h5 className="favouriteHeader">сповіщення</h5>
            {
                isLoading?
                <Loading/>
                :
                <>
                    {
                        notifications?
                        <ul className="notifacationList">
                            {
                                notifications.map(i => {
                                    return <Notification key={i.id} item={i}/>
                                })
                            }
                        </ul>
                        :
                        <div className="notNotifications">
                            У вас ще не має сповіщень
                        </div>
                    }
                </>
            }
        </div>
    );
};

export default NotificationPage;