import './ChatBox.scss';
import { formatDate } from '../../utils/formatDate.js';
import { useSelector } from 'react-redux';

const ChatBox = ({chat}) => {
    console.log(chat)

    const {user} = useSelector(state => state.user);
    const user2 = chat.otherUser;
    
    return (
        <>
            <div className="chatBox">
                <div className="left">
                    <div className="avatar">
                        <div className="img"
                            style={{
                                backgroundImage: user2.avatar
                                    ? `url(http://localhost:3000/users/${user2.avatar})`
                                    : 'none'
                            }}
                        >
                            {
                                user2.avatar? '' : user2.username[0]
                            }
                        </div>
                    </div>
                    <div className="info">
                        <span className='name'>{user2.username}</span>
                        <span className='mess'>
                            {
                                chat.lastMessage?.messageType === 'image'? 'зображення'
                                :
                                <>
                                    {chat.lastMessage?.content?.slice(0, 30)}
                                    {chat.lastMessage?.content?.length > 30 && '...'}
                                </>
                            }
                        </span>
                    </div>
                </div>
                <div className="details">
                    <span className='time'>
                        {chat.lastMessage?.createdAt
                            ? formatDate(chat.lastMessage.createdAt)
                            : ''
                        }
                    </span>
                    {
                        chat.lastMessage?.senderId === user.id || chat.lastMessage?.isRead
                            ? <div className="empty"></div>
                            : <div className="new">нове</div>
                    }
                </div>
            </div>
        </>
    );
};

export default ChatBox;