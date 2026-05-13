import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axiosCustom from '../../utils/axios.js';

export const getUsers = createAsyncThunk(
    'admin/getUsers',
    async (_, thunkAPI) => {
        try {
            const {data} = await axiosCustom.get(`/admin/users`);
            return data
        } 
        catch (error) {
            const message = error.response?.data?.message || error.message || 'Щось пішло не так';
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const blockUser = createAsyncThunk(
    'admin/blockUser',
    async (id, thunkAPI) => {
        try {
            const {data} = await axiosCustom.patch(`/admin/user/${id}/block`);
            return data
        } 
        catch (error) {
            const message = error.response?.data?.message || error.message || 'Щось пішло не так';
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const unBlockUser = createAsyncThunk(
    'admin/unBlockUser',
    async (id, thunkAPI) => {
        try {
            const {data} = await axiosCustom.patch(`/admin/user/${id}/unblock`);
            return data
        } 
        catch (error) {
            const message = error.response?.data?.message || error.message || 'Щось пішло не так';
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const changeUserRole = createAsyncThunk(
    'admin/changeUserRole',
    async ({id, role}, thunkAPI) => {
        try {
            const {data} = await axiosCustom.patch(`/admin/user/${id}/changerole`, {role});
            return data
        } 
        catch (error) {
            const message = error.response?.data?.message || error.message || 'Щось пішло не так';
            return thunkAPI.rejectWithValue(message);
        }
    }
)


const adminSlice = createSlice({
    name: "admin",
    initialState: {
        users: [],
        isLoading: false
    },
    extraReducers: (builder) => {
        //GET USERS
        builder.addCase(getUsers.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getUsers.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            state.users = payload.users;
        })
        builder.addCase(getUsers.rejected, (state) => {
            state.isLoading = false;
        })
    }
})

export default adminSlice.reducer