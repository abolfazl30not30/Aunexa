import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {setCredentials, logOut, selectCurrentAccessToken} from './authSlice'
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


const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    const [login, { isLoading,error }] = useLoginMutation()

    if (result?.error?.originalStatus === 401) {
        console.log('sending refresh token')

        const formData = {
            client_id:"client1",
            refresh_token:window.sessionStorage.getItem("refresh_token"),
            grant_type:"refresh_token",
        }

        const refreshResult = await login(formData)
        console.log(refreshResult)

        if (refreshResult?.data) {
            const user = api.getState().auth.user
            api.dispatch(setCredentials({ ...refreshResult.data, user }))
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logOut())
        }
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQuery,
    tagTypes: ['primary-store-input'],
    endpoints: builder => ({})
})