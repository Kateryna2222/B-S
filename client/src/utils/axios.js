import axios from 'axios';
import { storage } from '../storage/storage';

const instance = axios.create({
    baseURL:  'http://localhost:3000/api',
})

instance.interceptors.request.use(config => {
    const token = storage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export default instance;