import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosCustom from '../../utils/axios.js';


export const sendEmailForRecoverPassword = createAsyncThunk(
    'auth/recoverPassword',
    async (payload, thunkAPI) => {
        try {
            const {data} = await axiosCustom.post('/user/recover', payload);
            console.log(data)
            return data
        } 
        catch (error) {
            const message = error.response?.data?.message || error.message || 'Щось пішло не так';
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const recoverPassword = createAsyncThunk(
    'auth/recoverPassword',
    async (payload, thunkAPI) => {
        try {
            const {data} = await axiosCustom.put('/user/recover/password', payload);
            console.log(data)
            return data
        } 
        catch (error) {
            const message = error.response?.data?.message || error.message || 'Щось пішло не так';
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const upadateUser = createAsyncThunk(
    'auth/upadateUser',
    async (payload, thunkAPI) => {
        try {
            const {data} = await axiosCustom.put(`/user/me/update`, payload, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(data)
            return data
        } 
        catch (error) {
            const message = error.response?.data?.message || error.message || 'Щось пішло не так';
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const deleteUser = createAsyncThunk(
    'auth/deleteUser',
    async (payload, thunkAPI) => {
        try {
            const {data} = await axiosCustom.put('/user/recover/password', payload);
            console.log(data)
            return data
        } 
        catch (error) {
            const message = error.response?.data?.message || error.message || 'Щось пішло не так';
            return thunkAPI.rejectWithValue(message);
        }
    }
)




export const userExtraReducers = (builder) => {
    //RECOVER PASSWORD
    builder.addCase(recoverPassword.pending, (state) => {
        state.isLoading = true;
        state.status = null;
    })
    builder.addCase(recoverPassword.fulfilled, (state, {payload}) => {
        state.isLoading = false;
        state.status = payload;
    })
    builder.addCase(recoverPassword.rejected, (state, {payload}) => {
        state.status = payload;
        state.isLoading = false;
    })
    //UPDATE USER
    builder.addCase(upadateUser.pending, (state) => {
        state.isLoading = true;
        state.status = null;
    })
    builder.addCase(upadateUser.fulfilled, (state, {payload}) => {
        state.isLoading = false;
        state.status = payload;
        state.user = payload;
    })
    builder.addCase(upadateUser.rejected, (state, {payload}) => {
        state.status = payload;
        state.isLoading = false;
    })
};