
import { apiSlice } from "../../../api/apiSlice";

export const POSOapiSlice  = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllPOSO: builder.query({
            query: ({page, sort ,filterItem}) => ({
                url:`inventory/product-store-output/filter?page=${page - 1}&size=10&sort=date,${sort}&sort=time,${sort}&${filterItem}`,
            }),
            providesTags: ['product-store-output']
        }),
        savePOSO: builder.mutation({
            query: (body) => ({
                url: 'inventory/product-store-output',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['product-store-output']
        }),
        updatePOSO: builder.mutation({
            query: (body) => ({
                url: `inventory/product-store-output`,
                method: 'PUT',
                body: body
            }),
            invalidatesTags: ['product-store-output']
        }),
        deletePOSO: builder.mutation({
            query: ( id ) => ({
                url: `inventory/product-store-output/${id}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: ['product-store-output']
        }),
    })
})

export const {
    useGetAllPOSOQuery,
    useSavePOSOMutation,
    useUpdatePOSOMutation,
    useDeletePOSOMutation
} = POSOapiSlice