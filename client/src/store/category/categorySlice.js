import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axiosCustom from '../../utils/axios.js';

export const getCategories = createAsyncThunk(
    'category/getCategories',
    async (_, thunkAPI) => {
        try {
            const {data} = await axiosCustom.get(`/category`);
            return data
        } 
        catch (error) {
            const message = error.response?.data?.message || error.message || 'Щось пішло не так';
            return thunkAPI.rejectWithValue(message);
        }
    }
)

const categorySlice = createSlice({
    name: "category",
    initialState: {
        categories: [],
        currentCategory: null,
        parentCategories: [],
        isLoading: false,
        isLoaded: false
    },
    reducers: {
        changeCategory(state, {payload}){
            state.currentCategory = state.categories.find(c => c.id === payload);
        }
    },
    extraReducers: (builder) => {
        //GET CATEGORIES
        builder.addCase(getCategories.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getCategories.fulfilled, (state, {payload}) => {
            state.isLoading = false;
            state.isLoaded = true;
            state.categories = payload;
            state.parentCategories = payload.filter(
                category => category.parent_id === null
            );
        })
        builder.addCase(getCategories.rejected, (state) => {
            state.isLoading = false;
        })
    }
})

export const { changeCategory } = categorySlice.actions;
export default categorySlice.reducer