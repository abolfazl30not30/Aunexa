
import { apiSlice } from "../../../api/apiSlice";

export const PSIapiSlice  = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllPSI: builder.query({
            query: ({page, sort ,filterItem}) => ({
                url:`inventory/store-input/filter?page=${page - 1}&type=PRIMARY&size=10&sort=date,${sort}&sort=time,${sort}&${filterItem}`,
            }),
            providesTags: ['primary-store-input']
        }),
        savePSI: builder.mutation({
            query: (body) => ({
                url: 'inventory/store-input',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['primary-store-input']
        }),
        updatePSI: builder.mutation({
            query: (body) => ({
                url: `inventory/store-input`,
                method: 'PUT',
                body: body
            }),
            invalidatesTags: ['primary-store-input']
        }),
        deletePSI: builder.mutation({
            query: ( id ) => ({
                url: `inventory/store-input/${id}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: ['primary-store-input']
        }),
    })
})

export const {
    useGetAllPSIQuery,
    useSavePSIMutation,
    useUpdatePSIMutation,
    useDeletePSIMutation
} = PSIapiSlice