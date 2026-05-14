import './Notification.scss';
import {formatDate} from '../../utils/formatDate.js';

const Notification = ({item}) => {
    return (
        <li className="notificationItem">
            <div className="time">
                {formatDate(item.createdAt)}
            </div>
            <div className="title">
                {item.title}
            </div>
            <div className="message">
                {item.message}
            </div>
        </li>
    );
};

export default Notification;