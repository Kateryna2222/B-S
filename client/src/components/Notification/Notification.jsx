import './Notification.scss';
import {formatDate} from '../../utils/formatDate.js';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const Notification = ({item}) => {


    return (
        <li className="notificationItem">
            {
                item.isRead? 
                null
                :
                <div className="isNew">
                    нове
                </div>
            }
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