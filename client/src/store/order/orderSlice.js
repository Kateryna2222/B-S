import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axiosCustom from '../../utils/axios.js';


export const getOrders = createAsyncThunk(
    'order/getOrders',
    async (_, thunkAPI) => {
        try {
            const {data} = await axiosCustom.get(`/order`);
            return data
        } 
        catch (error) {
            const message = error.response?.data?.message || error.message || 'Щось пішло не так';
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const getOrder = createAsyncThunk(
    'order/getOrder',
    async (id, thunkAPI) => {
        try {
            const {data} = await axiosCustom.get(`/order/${id}`);
            return data
        } 
        catch (error) {
            const message = error.response?.data?.message || error.message || 'Щось пішло не так';
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const createOrder = createAsyncThunk(
    'order/createOrder',
    async (payload, thunkAPI) => {
        try {
            const {data} = await axiosCustom.post(`/order`, payload);
            return data
        } 
        catch (error) {
            const message = error.response?.data?.message || error.message || 'Щось пішло не так';
            return thunkAPI.rejectWithValue(message);
        }
    }
)


const orderSlice = createSlice({
    name: "order",
    initialState: {
        orders: [],
        currentOrder: null,
        pagination: {
            page: 1, 
            totalPages: 1
        },
        isLoading: false
    },
    extraReducers: (builder) => {
        //GET ALL
        builder.addCase(getOrders.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getOrders.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            state.orders = payload.orders;
            //const {orders, ...pagination} = payload;
            //state.pagination = pagination;
        })
        builder.addCase(getOrders.rejected, (state) => {
            state.isLoading = false;
        })
        //GET ONE
        builder.addCase(getOrder.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getOrder.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            state.currentOrder = payload.orders;
        })
        builder.addCase(getOrder.rejected, (state) => {
            state.isLoading = false;
        })
    }
})

export default orderSlice.reducer