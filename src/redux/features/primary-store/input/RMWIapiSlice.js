
import { apiSlice } from "../../../api/apiSlice";

export const RMWIapiSlice  = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllPSI: builder.query({
            query: ({page, sort ,filterItem}) => ({
                url:`inventory/primary-store-input/filter?page=${page - 1}&size=10&sort=date,${sort}&sort=time,${sort}&${filterItem}`,
            }),
            providesTags: ['primary-store-input']
        }),
        // getAll: builder.query({
        //     query: ({page = 1, sort = "desc",body}) => ({
        //         url: `inventory/primary-store-input/filter?page=${page - 1}&size=10&sort=date,${sort}&sort=time,${sort}`,
        //         method: 'GET',
        //         body: body
        //     }),
        //     invalidatesTags: ['primary-store-input']
        // }),
        // filter: builder.mutation({
        //     query: (body) => ({
        //         url: 'inventory/primary-store-input',
        //         method: 'POST',
        //         body: body
        //     }),
        //     invalidatesTags: ['primary-store-input']
        // }),
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
    useGetAllPSIQuery,
    useSaveMutation,
    useUpdateMutation,
    useDeleteMutation
} = RMWIapiSlice