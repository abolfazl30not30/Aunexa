
import { apiSlice } from "../../../api/apiSlice";

export const POSIapiSlice  = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllPOSI: builder.query({
            query: ({page, sort ,filterItem}) => ({
                url:`inventory/product-store-input/filter?page=${page - 1}&size=10&sort=date,${sort}&sort=time,${sort}&${filterItem}`,
            }),
            providesTags: ['product-store-input']
        }),
        savePOSI: builder.mutation({
            query: (body) => ({
                url: 'inventory/product-store-input',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['product-store-input']
        }),
        updatePOSI: builder.mutation({
            query: (body) => ({
                url: `inventory/product-store-input`,
                method: 'PUT',
                body: body
            }),
            invalidatesTags: ['product-store-input']
        }),
        deletePOSI: builder.mutation({
            query: ( id ) => ({
                url: `inventory/product-store-input/${id}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: ['product-store-input']
        }),
    })
})

export const {
    useGetAllPOSIQuery,
    useSavePOSIMutation,
    useUpdatePOSIMutation,
    useDeletePOSIMutation
} = POSIapiSlice