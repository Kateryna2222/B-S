import { configureStore, combineReducers } from "@reduxjs/toolkit"

import authSlice from "./authSlice"


const rootReducer = combineReducers({
    user: authSlice,
})

export const store = configureStore({
    reducer: rootReducer,
})