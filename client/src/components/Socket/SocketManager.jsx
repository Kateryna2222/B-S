import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../../socket.js';
//import { addMessage } from '../store/slices/chatSlice';

export default function SocketManager() {
  const dispatch = useDispatch();
  const { isAuth, accessToken } = useSelector(state => state.user); 

  useEffect(() => {
    if (!isAuth || !accessToken) return;

    socket.auth = { token: accessToken }; 
    socket.connect();

    socket.on('new_message', (message) => {
      dispatch(addMessage(message));
    });

    return () => {
      socket.off('new_message');
      socket.disconnect();
    };
  }, [isAuth, accessToken]);

  return null; 
}