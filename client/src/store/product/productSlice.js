import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axiosCustom from '../../utils/axios.js';

export const getProducts = createAsyncThunk(
    'product/getProducts',
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

export const getProduct = createAsyncThunk(
    'product/getProduct',
    async (id, thunkAPI) => {
        try {
            const {data} = await axiosCustom.get(`/product/${id}`);
            return data
        } 
        catch (error) {
            const message = error.response?.data?.message || error.message || 'Щось пішло не так';
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const deleteProduct = createAsyncThunk(
    'product/deleteProduct',
    async (id, thunkAPI) => {
        try {
            const {data} = await axiosCustom.delete(`/product/${id}`);
            return {data, id}
        } 
        catch (error) {
            const message = error.response?.data?.message || error.message || 'Щось пішло не так';
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const createProduct = createAsyncThunk(
    'product/createProduct',
    async (payload, thunkAPI) => {
        try {
            const {data} = await axiosCustom.post(`/product`, payload ,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return data
        } 
        catch (error) {
            const message = error.response?.data?.message || error.message || 'Щось пішло не так';
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const updateProduct = createAsyncThunk(
    'product/updateProduct',
    async ({id, payload}, thunkAPI) => {
        try {
            const {data} = await axiosCustom.put(`/product/${id}`, payload ,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return data
        } 
        catch (error) {
            const message = error.response?.data?.message || error.message || 'Щось пішло не так';
            return thunkAPI.rejectWithValue(message);
        }
    }
)

const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        currentProduct: null,
        pagination: {
            page: 1, 
            totalPages: 1
        },
        isLoading: false
    },
    reducers: {
        changePage(state, {payload}){
            state.pagination.page = payload;
        }
    },
    extraReducers: (builder) => {
        //GET ALL
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
        //GET ONE
        builder.addCase(getProduct.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getProduct.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            state.currentProduct = payload;
        })
        builder.addCase(getProduct.rejected, (state) => {
            state.isLoading = false;
        })
        //DELETE
        builder.addCase(deleteProduct.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            state.products = state.products.filter(
                product => product.id !== payload.id
            );
        })
    }
})

export const { changePage } = productSlice.actions;
export default productSlice.reducer