import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axiosCustom from '../../utils/axios.js';

export const setRating = createAsyncThunk(
    'rating/setRating',
    async ({sellerId, rating}, thunkAPI) => {
        try {
            const {data} = await axiosCustom.put(`/rating/${sellerId}`, {rating});
            return data
        } 
        catch (error) {
            const message = error.response?.data?.message || error.message || 'Щось пішло не так';
            return thunkAPI.rejectWithValue(message);
        }
    }
)


const ratingSlice = createSlice({
    name: "rating"
})

export default ratingSlice.reducer