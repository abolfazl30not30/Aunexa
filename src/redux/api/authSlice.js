'use client'
import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        name:"",
        role: "",
        accessToken: "" ,
        profile:"",
        subOrganizationName: "",
        subOrganizationId:"",
    },
    reducers: {
        setCredentials: (state, action) => {
            return action.payload
        },
        logOut: (state, action) => {
            const initialState = {
                name:null,
                role: null,
                accessToken: null ,
                profile:null,
                subOrganizationName: null,
                subOrganizationId:null,
            }
            state = {...initialState}
        }
    },
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentRole = (state) => state.auth.role
export const selectCurrentAccessToken = (state) => state.auth.accessToken