import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../../socket.js';
import { addMessage, updateChatLastMessage, markMessagesAsRead } from '../../store/chat/chatSlice.js';

export default function SocketManager() {
  const dispatch = useDispatch();
  const { isAuth, accessToken } = useSelector(state => state.user); 

  useEffect(() => {
    if (!isAuth || !accessToken) return;

    socket.auth = { token: accessToken }; 
    socket.connect();

    socket.on('receive_message', (message) => {
      dispatch(addMessage(message));
    });

    socket.on('chat_updated', (data) => {
      dispatch(updateChatLastMessage(data));
    });

    socket.on("messages_read", ({ chatId, userId }) => {
      dispatch(markMessagesAsRead({ chatId, userId }));
    });

    return () => {
      socket.off('receive_message');
      socket.off('chat_updated');
      socket.disconnect();
    };
  }, [isAuth, accessToken]);

  return null; 
}