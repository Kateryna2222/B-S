import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axiosCustom from '../../utils/axios.js';

export const getFavourites = createAsyncThunk(
    'favourite/getFavourites',
    async (_, thunkAPI) => {
        try {
            const {data} = await axiosCustom.get(`/favourite`);
            return data
        } 
        catch (error) {
            const message = error.response?.data?.message || error.message || 'Щось пішло не так';
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const addToFavourite = createAsyncThunk(
    'favourite/addToFavourite',
    async (id, thunkAPI) => {
        try {
            const {data} = await axiosCustom.post(`/favourite/${id}`);
            return data
        } 
        catch (error) {
            const message = error.response?.data?.message || error.message || 'Щось пішло не так';
            return thunkAPI.rejectWithValue(message);
        }
    }
)
export const removeFromFavourite = createAsyncThunk(
    'favourite/removeFromFavourite',
    async (id, thunkAPI) => {
        try {
            const {data} = await axiosCustom.delete(`/favourite/${id}`);
            return data
        } 
        catch (error) {
            const message = error.response?.data?.message || error.message || 'Щось пішло не так';
            return thunkAPI.rejectWithValue(message);
        }
    }
)

const favouriteSlice = createSlice({
    name: "favourite",
    initialState: {
        products: [],
        isLoading: false
    },
    extraReducers: (builder) => {
        //GET PRODUCTS
        builder.addCase(getFavourites.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getFavourites.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            state.products = payload;
        })
        builder.addCase(getFavourites.rejected, (state) => {
            state.isLoading = false;
        })
    }
})

export default favouriteSlice.reducer