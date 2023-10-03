import { apiSlice } from "../../../api/apiSlice"

export const RMWIapiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/users',
        })
    })
})

export const {
    useGetUsersQuery
} = RMWIapiSlice