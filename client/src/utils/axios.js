import axios from 'axios';
import { storage } from '../storage/storage';

export const API_ULR = 'http://localhost:3000/api'

const instance = axios.create({
    withCredentials: true,
    baseURL: API_ULR
})

instance.interceptors.request.use(config => {
    const token = storage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

instance.interceptors.response.use(config => {
    return config;
}, async (error)=>{
    const originalRequest = error.config;
    if(error.response?.status == 401 && error.config && !error.config._isRetry){
        originalRequest._isRetry = true;
        try {
            const {data} = await axios.get(`${API_ULR}/auth/refresh`, {withCredentials: true});
            storage.setItem('accessToken', data.accessToken);
            return instance.request(originalRequest);
        } 
        catch (error) {
            console.log('Користувач не авторизований')
        }
    }
    throw error;
})

export default instance;