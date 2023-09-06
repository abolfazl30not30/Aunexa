'use client'
import { configureStore } from "@reduxjs/toolkit"
import {loginSlice} from "@/redux/api/loginSlice";

export const store = configureStore({
    reducer: {
        [loginSlice.reducerPath]: loginSlice.reducer,
    },
})