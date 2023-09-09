'use client'
import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: 'auth',
    initialState: { role: null, access_token: null },
    reducers: {
        setCredentials: (state, action) => {
            const { role, accessToken } = action.payload
            state.role = role
            state.access_token = accessToken
        },
        logOut: (state, action) => {
            state.role = null
            state.access_token = null
        }
    },
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentRole = (state) => state.auth.role
export const selectCurrentAccessToken = (state) => state.auth.access_token