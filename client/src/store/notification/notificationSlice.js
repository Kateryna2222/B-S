import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axiosCustom from '../../utils/axios.js';


export const getNotifications = createAsyncThunk(
    'notification/getNotifications',
    async (_, thunkAPI) => {
        try {
            const {data} = await axiosCustom.get(`/notification`);
            return data
        } 
        catch (error) {
            const message = error.response?.data?.message || error.message || 'Щось пішло не так';
            return thunkAPI.rejectWithValue(message);
        }
    }
)


const notificationSlice = createSlice({
    name: "notification",
    initialState: {
        seller: null,
        notifications: [],
        isLoading: false
    },
    extraReducers: (builder) => {
        builder.addCase(getNotifications.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getNotifications.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            state.notifications = payload;
        })
        builder.addCase(getNotifications.rejected, (state) => {
            state.isLoading = false;
        })
    }
})

export default notificationSlice.reducer