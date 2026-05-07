import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../../socket.js';
import { addMessage } from '../../store/chat/chatSlice.js';

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

    return () => {
      socket.off('receive_message');
      socket.disconnect();
    };
  }, [isAuth, accessToken]);

  return null; 
}