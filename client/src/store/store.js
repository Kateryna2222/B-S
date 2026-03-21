import { configureStore, combineReducers } from "@reduxjs/toolkit"

import userSlice from "./user/userSlice.js"


const rootReducer = combineReducers({
    user: userSlice,
})

export const store = configureStore({
    reducer: rootReducer,
})