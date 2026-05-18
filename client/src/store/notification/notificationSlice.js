import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axiosCustom from '../../utils/axios.js';


export const getNotifications = createAsyncThunk(
    'notification/getNotifications',
    async ({limit = 10, onlyUnread = false}={}, thunkAPI) => {
        try {
            const {data} = await axiosCustom.get(`/notification?limit=${limit}${onlyUnread? `&onlyUnread=${onlyUnread}`:''}`);
            return data
        } 
        catch (error) {
            const message = error.response?.data?.message || error.message || 'Щось пішло не так';
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const loadMoreNotifications = createAsyncThunk(
    'notification/loadMoreNotifications',
    async ({ cursor, limit = 10 }, thunkAPI) => {
        try {
            const { data } = await axiosCustom.get(`/notification?cursor=${cursor}&limit=${limit}`);
            return data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.message);
        }
    }
);

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
        nextCursor: null,
        hasMore: true,
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
            state.notifications = payload.notifications;
            state.nextCursor = payload.nextCursor;
            state.hasMore = payload.hasMore;
            state.unReadCount = state.notifications.filter(n => !n.isRead).length;
        })
        builder.addCase(getNotifications.rejected, (state) => {
            state.isLoading = false;
        })
        // load more
        builder.addCase(loadMoreNotifications.fulfilled, (state, {payload}) => {
            state.nextCursor = payload.nextCursor;
            state.hasMore = payload.hasMore;
            state.notifications.push(...payload.notifications);
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