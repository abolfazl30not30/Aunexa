
import { apiSlice } from "../../../api/apiSlice";

export const RMWIapiSlice  = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAll: builder.query({
            query: (page = 1) => `inventory/primary-store-input?page=${page - 1}&size=10`,
            providesTags: ['primary-store-input']
        }),
        save: builder.mutation({
            query: (body) => ({
                url: 'inventory/primary-store-input',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['primary-store-input']
        }),
        update: builder.mutation({
            query: (body) => ({
                url: `inventory/primary-store-input`,
                method: 'PUT',
                body: body
            }),
            invalidatesTags: ['primary-store-input']
        }),
        delete: builder.mutation({
            query: ( id ) => ({
                url: `inventory/primary-store-input/${id}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: ['primary-store-input']
        }),
    })
})

export const {
    useGetAllQuery,
    useSaveMutation,
    useUpdateMutation,
    useDeleteMutation
} = RMWIapiSlice