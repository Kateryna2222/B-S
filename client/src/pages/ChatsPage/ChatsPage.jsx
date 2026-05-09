import './ChatsPage.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import ChatBox from "../../components/Chat/ChatBox.jsx";
import { getChats } from '../../store/chat/chatSlice.js';
import Loading from '../../components/Loading/Loading.jsx';

import socket from '../../socket.js';

const ChatsPage = () => {
    const dispatch = useDispatch();
    const { chats, isLoading } = useSelector(state => state.chat);
    const { user } = useSelector(state => state.user);

    useEffect(()=>{
        dispatch(getChats());
    }, [dispatch])


    return (
        <>
            <div className="chatsPage">
                <h5>Чати</h5>
                {
                    isLoading?
                    <Loading/>
                    :
                    chats.length > 0?
                    <ul className="chats">
                        {
                            chats.map((chat) => {
                                return <li key={chat.id}>
                                    {
                                        (user.id === chat.otherUser?.id)?
                                        null
                                        :
                                        <Link to={`${chat.otherUser?.id}`}>
                                            <ChatBox chat={chat}/>
                                        </Link>
                                    }
                                </li>
                            })
                        }
                    </ul>
                    :
                    <div className="noChats">
                        Чати відсутні
                    </div>
                }
            </div>
        </>
    );
};

export default ChatsPage;