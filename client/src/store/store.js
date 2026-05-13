import { configureStore, combineReducers } from "@reduxjs/toolkit"

import userSlice from "./user/userSlice.js";
import productSlice from "./product/productSlice.js";
import categorySlice from "./category/categorySlice.js";
import favouriteSlice from "./favourite/favouriteSlice.js";
import chatSlice from "./chat/chatSlice.js";
import adminSlice from "./admin/adminSlice.js";
import notificationSlice from "./notification/notificationSlice.js";


const rootReducer = combineReducers({
    user: userSlice,
    product: productSlice,
    category: categorySlice,
    favourite: favouriteSlice,
    chat: chatSlice,
    admin: adminSlice,
    notification: notificationSlice
})

export const store = configureStore({
    reducer: rootReducer,
})