import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications, loadMoreNotifications } from "../../store/notification/notificationSlice.js";
import Notification from "../../components/Notification/Notification.jsx";
import Loading from "../../components/Loading/Loading.jsx";
import { markAllAsRead } from "../../store/notification/notificationSlice.js";
import { useInfiniteScroll } from "../../utils/useInfiniteScroll.js";

const NotificationPage = () => {
    const dispatch = useDispatch();
    const {notifications, isLoading, nextCursor, hasMore} = useSelector(state => state.notification);
    const {user} = useSelector(state => state.user);
    
    useEffect(()=>{
        dispatch(getNotifications());
        return () => {
                dispatch(markAllAsRead());
            }
    }, [dispatch])
    
    const loadMoreRef = useInfiniteScroll({
        hasMore,
        isLoading,
        rootMargin: "-90px",
        loadMore: () => {
            dispatch(loadMoreNotifications({ cursor: nextCursor }));
        }
    });

    return (
        <div className="notifacationPage">
            <h5 className="favouriteHeader">сповіщення</h5>
            {
                isLoading?
                <Loading/>
                :
                <>
                    {
                        notifications.length?
                        <>
                            <ul className="notifacationList">
                                {
                                    notifications.map(i => {
                                        return <Notification key={i.id} item={i}/>
                                    })
                                }
                                <div ref={loadMoreRef}/>
                            </ul>
                        </>
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