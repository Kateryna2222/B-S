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

export const markAllAsRead = createAsyncThunk(
    'notification/markAllAsRead',
    async (_, thunkAPI) => {
        try {
            const { data } = await axiosCustom.patch('/notification/read-all');
            return data;
        } 
        catch (error) {
            const message = error.response?.data?.message || error.message || 'Щось пішло не так';
            return thunkAPI.rejectWithValue(message);
        }
    }
);


const notificationSlice = createSlice({
    name: "notification",
    initialState: {
        notifications: [],
        unReadCount: 0,
        isLoading: false
    },
    reducers: {
        addNotification(state, { payload }) {
            state.notifications.unshift(payload); 
            state.unReadCount += 1;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getNotifications.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getNotifications.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            state.notifications = payload;
            state.unReadCount = state.notifications.filter(n => !n.isRead).length;
        })
        builder.addCase(getNotifications.rejected, (state) => {
            state.isLoading = false;
        })
        // markAllAsRead
        builder.addCase(markAllAsRead.fulfilled, (state) => {
            state.notifications.forEach(n => {
                n.isRead = true;
            });
            state.unReadCount = 0
        });
    }
})

export const { addNotification } = notificationSlice.actions;
export default notificationSlice.reducer