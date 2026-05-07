import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import socket from '../../socket.js';

import { startChat, getMessages } from '../../store/chat/chatSlice.js';

export default function ChatPage() {
    const dispatch = useDispatch();

    const { id } = useParams();
    const otherUserId = id;
    const { user } = useSelector(state => state.user);

    const { activeChatId, messages, isMessagesLoading } = useSelector(state => state.chat);

    const [text, setText] = useState('');

    useEffect(() => {
        if (!otherUserId) return;
        dispatch(startChat(otherUserId));
    }, [dispatch, otherUserId]);

  
    useEffect(() => {
        if (!activeChatId) return;

        dispatch(getMessages({ chatId: activeChatId }));
        socket.emit('join_chat', activeChatId);

        return () => {
            socket.emit('leave_chat', activeChatId);
        };
    }, [dispatch, activeChatId]);


    const handleSendMessage = async () => {
        if (!text.trim()) return;
        if (!activeChatId) return;

        socket.emit("send_message", {
            chatId: activeChatId,
            content: text
        });

        setText('');
    };

  
  return (
    <div className="chatPage">
        <div className="header">
            User {otherUserId}
        </div>

        <div className="chat-messages">
            {isMessagesLoading && (
                <div>Loading...</div>
            )}
            {(messages[activeChatId] || []).map(msg => {
                const isMine = msg.senderId === user.id;

                return (
                    <div
                        key={msg.id}
                        className={isMine ? 'message mine' : 'message'}
                    >   
                        {msg.content && (
                            <div className="message-text">
                                {isMine? 'YOU: ' : 'SELLER: '}
                                {msg.content}
                            </div>
                        )}
                    </div>
                );
            })}

        </div>

        <div className="chat-input">
            <input
                type="text"
                placeholder="Type message..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button onClick={handleSendMessage}>
                Send
            </button>
        </div>

        </div>
    );
}