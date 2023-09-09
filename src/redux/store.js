'use client'
import { configureStore } from "@reduxjs/toolkit"
import {loginSlice} from "@/redux/api/loginSlice";
import authReducer from "@/redux/api/authSlice";
export const store = configureStore({
    reducer: {
        [loginSlice.reducerPath]: loginSlice.reducer,
        auth:authReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(loginSlice.middleware)
})