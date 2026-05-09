import './ChatBox.scss';
import { formatDate } from '../../utils/formatDate.js';
import { memo } from 'react';

const ChatBox = ({chat}) => {
    console.log(chat)

    const user = chat.otherUser;
    
    return (
        <>
            <div className="chatBox">
                <div className="left">
                    <div className="avatar">
                        <div className="img"
                            style={{
                                backgroundImage: user.avatar
                                    ? `url(http://localhost:3000/users/${user.avatar})`
                                    : 'none'
                            }}
                        >
                            {
                                user.avatar? '' : user.username[0]
                            }
                        </div>
                    </div>
                    <div className="info">
                        <span className='name'>{user.username}</span>
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
                    <div className="new">
                        нове
                    </div>
                    {/* <div className="empthy"></div> */}
                </div>
            </div>
        </>
    );
};

export default ChatBox;