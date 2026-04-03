import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosCustom from '../../utils/axios.js';


export const sendEmailForRecoverPassword = createAsyncThunk(
    'auth/recoverPasswordEmail',
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
    async (_, thunkAPI) => {
        try {
            const {data} = await axiosCustom.delete('/user/me/delete');
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
    })
    builder.addCase(recoverPassword.fulfilled, (state) => {
        state.isLoading = false;
    })
    builder.addCase(recoverPassword.rejected, (state) => {
        state.isLoading = false;
    })
    //UPDATE USER
    builder.addCase(upadateUser.pending, (state) => {
        state.isLoading = true;
    })
    builder.addCase(upadateUser.fulfilled, (state, {payload}) => {
        state.isLoading = false;
        state.user = payload;
    })
    builder.addCase(upadateUser.rejected, (state) => {
        state.isLoading = false;
    })
    //DELETE USER
    builder.addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
    })
    builder.addCase(deleteUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.accessToken = null;
        state.isAuth = false;
    })
    builder.addCase(deleteUser.rejected, (state) => {
        state.isLoading = false;
    })
};