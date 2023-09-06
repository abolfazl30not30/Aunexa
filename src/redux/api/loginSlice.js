'use client'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://vipsoftware1.com',
    mode: "no-cors",
    prepareHeaders: (headers) => {
        headers.set("Content-Type", `application/x-www-form-urlencoded`)
        return headers
    }
})

export const loginSlice = createApi({
    reducerPath: 'loginApi',
    baseQuery: baseQuery,
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/realms/msc/protocol/openid-connect/token',
                method: 'POST',
                body: new URLSearchParams({...credentials})
            })
        }),
    })
})

export const {useLoginMutation} = loginSlice
