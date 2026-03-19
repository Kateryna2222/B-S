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

export default instance;