import { configureStore, combineReducers } from "@reduxjs/toolkit"

import userSlice from "./user/userSlice.js";
import productSlice from "./product/productSlice.js"


const rootReducer = combineReducers({
    user: userSlice,
    product: productSlice
})

export const store = configureStore({
    reducer: rootReducer,
})