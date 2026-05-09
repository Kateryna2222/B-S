import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosCustom from '../../utils/axios.js';


export const startChat = createAsyncThunk(
    'chat/startChat',
    async (otherUserId, thunkAPI) => {
        try {
            const { data } = await axiosCustom.post('/chat/start', { otherUserId });
            return data;
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Щось пішло не так';
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const getChats = createAsyncThunk(
    'chat/getChats',
    async (_, thunkAPI) => {
        try {
            const { data } = await axiosCustom.get('/chat');
            return data;
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Щось пішло не так';
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const getMessages = createAsyncThunk(
    'chat/getMessages',
    async ({ chatId, cursor = null }, thunkAPI) => {
        try {
            const params = cursor ? `?cursor=${cursor}` : '';
            const { data } = await axiosCustom.get(`/chat/${chatId}/messages${params}`);
            return { chatId, messages: data, cursor };
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Щось пішло не так';
            return thunkAPI.rejectWithValue(message);
        }
    }
)


const chatSlice = createSlice({
    name: "chat",
    initialState: {
        chats: [],
        activeChatId: null,
        messages: {},     
        hasMore: {},       
        isLoading: false,
        isMessagesLoading: false,
    },
    reducers: {
        setActiveChat(state, { payload }) {
            state.activeChatId = payload;
        },

        addMessage(state, { payload }) {
            const { chatId } = payload;
            if (!state.messages[chatId]) state.messages[chatId] = [];

            const exists = state.messages[chatId].some(m => m.id === payload.id);
            if (!exists) {
                state.messages[chatId].push(payload);
            }

            const chat = state.chats.find(c => c.id === chatId);
            if (chat) {
                chat.lastMessage = payload;
                state.chats = [chat, ...state.chats.filter(c => c.id !== chatId)];
            }
        },

        updateChatLastMessage: (state, {payload}) => {
            const chat = state.chats.find(
                c => c.id === payload.chatId
            );

            if (chat) {
                chat.lastMessage = payload.lastMessage;
            }
        }
        
    },
    extraReducers: (builder) => {
        // GET CHATS
        builder.addCase(getChats.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getChats.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.chats = payload;
        })
        builder.addCase(getChats.rejected, (state) => {
            state.isLoading = false;
        })

        // GET MESSAGES
        builder.addCase(getMessages.pending, (state) => {
            state.isMessagesLoading = true;
        })
        builder.addCase(getMessages.fulfilled, (state, { payload }) => {
            state.isMessagesLoading = false;
            const { chatId, messages, cursor } = payload;
            if (!cursor) {
                state.messages[chatId] = messages;
            } else {
                state.messages[chatId] = [...messages, ...(state.messages[chatId] || [])];
            }
            state.hasMore[chatId] = messages.length === 30;
        })
        builder.addCase(getMessages.rejected, (state) => {
            state.isMessagesLoading = false;
        })

        // START CHAT
        builder.addCase(startChat.fulfilled, (state, { payload }) => {
            state.activeChatId = payload.chatId;
        })
    }
})

export const { setActiveChat, addMessage, updateChatLastMessage } = chatSlice.actions;
export default chatSlice.reducer;