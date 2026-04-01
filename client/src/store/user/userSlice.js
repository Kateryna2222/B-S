import { createSlice } from "@reduxjs/toolkit";
import { storage } from "../../storage/storage.js";

import { authExtraReducers } from "./authFunctions.js";
import { userExtraReducers } from "./userFunction.js";


const userSlice = createSlice({
    name: "auth",
    initialState: {
        isAuth: !!storage.getItem('accessToken'),
        user: null,
        accessToken: storage.getItem('accessToken') || null,
        isLoading: false
    },
    reducers: {},
    extraReducers: (builder) => {
        authExtraReducers(builder);
        userExtraReducers(builder);
    }
})

export default userSlice.reducer