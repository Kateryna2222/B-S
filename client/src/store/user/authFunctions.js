import { createAsyncThunk } from "@reduxjs/toolkit";
import { storage } from "../../storage/storage.js";
import axiosCustom from '../../utils/axios.js';
import axios from "axios";
import { API_ULR } from "../../utils/axios.js";


export const register = createAsyncThunk(
    'auth/register',
    async (payload, thunkAPI) => {
        try {
            const {data} = await axiosCustom.post('/auth/registration', payload, {
                 headers: {
                    'Content-Type': 'multipart/form-data'
                },
            });
            if(data.accessToken){
                storage.setItem('accessToken', data.accessToken)
            }
            console.log(data)
            return data
        } 
        catch (error) {
            const message = error.response?.data?.message || error.message || 'Щось пішло не так';
            return thunkAPI.rejectWithValue(message);
        }
    }
)


export const login = createAsyncThunk(
    'auth/login',
    async (payload, thunkAPI) => {
        try {
            const {data} = await axiosCustom.post('/auth/login', payload);
            if(data.accessToken){
                storage.setItem('accessToken', data.accessToken)
            }
            console.log(data)
            return data
        } 
        catch (error) {
            const message = error.response?.data?.message || error.message || 'Щось пішло не так';
            return thunkAPI.rejectWithValue(message);
        }
    }
)


export const logout = createAsyncThunk(
    'auth/logout',
    async (_, thunkAPI) => {
        try {
            const {data} = await axiosCustom.post('/auth/logout', {});
            storage.removeItem('accessToken');
            console.log(data)
            return data
        } 
        catch (error) {
            const message = error.response?.data?.message || error.message || 'Щось пішло не так';
            return thunkAPI.rejectWithValue(message);
        }
    }
)


export const checkAuth = createAsyncThunk(
    'auth/checkAuth',
    async (_, thunkAPI) => {
        try {
            const {data} = await axios.get(`${API_ULR}/auth/refresh`, {withCredentials: true});
            if(data.accessToken){
                storage.setItem('accessToken', data.accessToken)
            }
            console.log(data)
            return data
        } 
        catch (error) {
            const message = error.response?.data?.message || error.message || 'Щось пішло не так';
            return thunkAPI.rejectWithValue(message);
        }
    }
)



export const authExtraReducers = (builder) => {
    //REGISTER
    builder.addCase(register.pending, (state) => {
        state.isLoading = true;
        state.status = null;
    })
    builder.addCase(register.fulfilled, (state, {payload}) => {
        state.isLoading = false;
        state.status = payload;
        state.user = payload.user;
        state.accessToken = payload.accessToken;
        state.isAuth = payload.user.isActivated;
    })
    builder.addCase(register.rejected, (state, {payload}) => {
        state.status = payload;
        state.isLoading = false;
    })
    //LOGIN
    builder.addCase(login.pending, (state) => {
        state.isLoading = true;
        state.status = null;
    })
    builder.addCase(login.fulfilled, (state, {payload}) => {
        state.isLoading = false;
        state.status = payload;
        state.user = payload.user;
        state.accessToken = payload.accessToken;
        state.isAuth = payload.user.isActivated;
    })
    builder.addCase(login.rejected, (state, {payload}) => {
        state.status = payload;
        state.isLoading = false;
    })
    //LOGOUT
    builder.addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.status = null;
    })
    builder.addCase(logout.fulfilled, (state, {payload}) => {
        state.isLoading = false;
        state.status = payload;
        state.user = null;
        state.accessToken = null;
        state.isAuth = false;
    })
    builder.addCase(logout.rejected, (state, {payload}) => {
        state.status = payload;
        state.isLoading = false;
    })
    //CHECK AUTH
    builder.addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
        state.status = null;
    })
    builder.addCase(checkAuth.fulfilled, (state, {payload}) => {
        state.isLoading = false;
        state.status = payload;
        state.user = payload.user;
        state.accessToken = payload.accessToken;
        state.isAuth = payload.user.isActivated;
    })
    builder.addCase(checkAuth.rejected, (state, {payload}) => {
        state.status = payload;
        state.isLoading = false;
    })
};