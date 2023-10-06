'use client'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {setCredentials, logOut} from './authSlice'
import {useLoginMutation} from "@/redux/api/loginSlice";

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:9191/api/v1/',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.accessToken
        if (token) {
            headers.set("Authorization", `Bearer ${token}`)
        }
        return headers
    }

})

const login = async () =>{
    const formData = {
        client_id:"client1",
        refresh_token:window.sessionStorage.getItem("refresh_token"),
        grant_type:"refresh_token",
    }
    const [login, { isLoading,error }] = useLoginMutation()
    const refreshResult = await login(formData)
    return refreshResult;
}

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    console.log("hello what up")

    // if (result?.error?.status === 500) {
    //     console.log("refresh token")
    //
    //
    //     if (refreshResult?.data) {
    //         result = await baseQuery(args, api, extraOptions)
    //     } else {
    //         api.dispatch(logOut())
    //     }
    // }

    return result
}

export const apiSlice = createApi({
    reducerPath:"api",
    baseQuery: baseQueryWithReauth,
    tagTypes: ['primary-store-input'],
    endpoints: builder => ({})
})