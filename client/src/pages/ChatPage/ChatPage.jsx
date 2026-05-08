import './ChatPage.scss';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import socket from '../../socket.js';

import { startChat, getMessages } from '../../store/chat/chatSlice.js';
import Loading from '../../components/Loading/Loading.jsx';
import imgIcon from '../../assets/img.svg';
import MessageBox from '../../components/MessageBox/MessageBox.jsx';

export default function ChatPage() {
    const dispatch = useDispatch();

    const { id } = useParams();
    const otherUserId = id;
    const { user } = useSelector(state => state.user);

    const { activeChatId, chats, messages, isMessagesLoading } = useSelector(state => state.chat);

    const [text, setText] = useState('');
    const [img, setImg] = useState(null);

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
        if (!text.trim() && !img) return;
        if (!activeChatId) return;

        let imageData = null;
        if (img) {
            const arrayBuffer = await img.arrayBuffer();
            imageData = {
                buffer: arrayBuffer,
                originalName: img.name,
                mimeType: img.type
            };
        }

        socket.emit("send_message", {
            chatId: activeChatId,
            content: text,
            image: imageData
        });

        setText('');
        setImg(null);

        if (fileRef.current) {
            fileRef.current.value = '';
        }
    };

    //img
    const fileRef = useRef(null);

    //mess scroll
    const messagesRef = useRef(null);
    useEffect(() => {
        messagesRef.current?.scrollTo({
            top: messagesRef.current.scrollHeight,
            behavior: "smooth"
        });
    }, [messages]);

  
  return (
    <div className="chatPage">

        <div className="chatMessages" ref={messagesRef}>
            {isMessagesLoading && (
                <Loading/>
            )}
            {(messages[activeChatId] || []).map(msg => {
                const isMine = msg.senderId === user.id;
                return <MessageBox key={msg.id} isMine={isMine} msg={msg}/>
            })}

        </div>

        <div className="chatInput">
            <div className="inputSide">
                <button className='imgBtn' onClick={() => fileRef.current.click()}>
                    <img src={imgIcon} alt="зображення" />
                </button> 
                <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }} 
                    onChange={(e) => setImg(e.target.files[0])}
                />
                <textarea
                    className='messageField'
                    placeholder="Введіть повідомлення..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </div>
            <button className='sendBtn' onClick={handleSendMessage}>
                надіслати
            </button>
        </div>

    </div>
    );
}