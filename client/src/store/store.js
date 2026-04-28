import { configureStore, combineReducers } from "@reduxjs/toolkit"

import userSlice from "./user/userSlice.js";
import productSlice from "./product/productSlice.js";
import categorySlice from "./category/categorySlice.js";
import favouriteSlice from "./favourite/favouriteSlice.js";


const rootReducer = combineReducers({
    user: userSlice,
    product: productSlice,
    category: categorySlice,
    favourite: favouriteSlice
})

export const store = configureStore({
    reducer: rootReducer,
})