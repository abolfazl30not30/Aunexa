'use client'
import { configureStore } from "@reduxjs/toolkit"
import {loginSlice} from "@/redux/api/loginSlice";
import authReducer from "@/redux/api/authSlice";
import { apiSlice } from '../redux/api/apiSlice';

export const store = configureStore({
    reducer: {
        [loginSlice.reducerPath]: loginSlice.reducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth:authReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware,loginSlice.middleware)
})