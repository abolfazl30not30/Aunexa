
import { apiSlice } from "../../../api/apiSlice";

export const ESOapiSlice  = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllESO: builder.query({
            query: ({page, sort ,filterItem}) => ({
                url:`inventory/equipment-store-output/filter?page=${page - 1}&size=10&sort=date,${sort}&sort=time,${sort}&${filterItem}`,
            }),
            providesTags: ['equipment-store-output']
        }),
        saveESO: builder.mutation({
            query: (body) => ({
                url: 'inventory/equipment-store-output',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['equipment-store-output']
        }),
        updateESO: builder.mutation({
            query: (body) => ({
                url: `inventory/equipment-store-output`,
                method: 'PUT',
                body: body
            }),
            invalidatesTags: ['equipment-store-output']
        }),
        deleteESO: builder.mutation({
            query: ( id ) => ({
                url: `inventory/equipment-store-output/${id}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: ['equipment-store-output']
        }),
    })
})

export const {
    useGetAllESOQuery,
    useSaveESOMutation,
    useUpdateESOMutation,
    useDeleteESOMutation
} = ESOapiSlice