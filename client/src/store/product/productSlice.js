import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axiosCustom from '../../utils/axios.js';

export const getProducts = createAsyncThunk(
    'auth/getProducts',
    async (payload, thunkAPI) => {
        try {
            const params = payload? `?${payload}` : '';
            const {data} = await axiosCustom.get(`/product${params}`);
            return data
        } 
        catch (error) {
            const message = error.response?.data?.message || error.message || 'Щось пішло не так';
            return thunkAPI.rejectWithValue(message);
        }
    }
)

const productSlice = createSlice({
    name: "auth",
    initialState: {
        products: [],
        currentProduct: null,
        pagination: {},
        isLoading: false
    },
    reducers: {},
    extraReducers: (builder) => {
        //GET POSTS
        builder.addCase(getProducts.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getProducts.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            state.products = payload.products;
            const {products, ...pagination} = payload;
            state.pagination = pagination;
        })
        builder.addCase(getProducts.rejected, (state) => {
            state.isLoading = false;
        })
    }
})

export default productSlice.reducer