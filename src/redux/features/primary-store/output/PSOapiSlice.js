
import { apiSlice } from "../../../api/apiSlice";

export const PSOapiSlice  = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllPSO: builder.query({
            query: ({page, sort ,filterItem}) => ({
                url:`inventory/primary-store-output/filter?page=${page - 1}&size=10&sort=date,${sort}&sort=time,${sort}&${filterItem}`,
            }),
            providesTags: ['primary-store-output']
        }),
        savePSO: builder.mutation({
            query: (body) => ({
                url: 'inventory/primary-store-output',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['primary-store-output']
        }),
        updatePSO: builder.mutation({
            query: (body) => ({
                url: `inventory/primary-store-output`,
                method: 'PUT',
                body: body
            }),
            invalidatesTags: ['primary-store-output']
        }),
        deletePSO: builder.mutation({
            query: ( id ) => ({
                url: `inventory/primary-store-output/${id}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: ['primary-store-output']
        }),
    })
})

export const {
    useGetAllPSOQuery,
    useSavePSOMutation,
    useUpdatePSOMutation,
    useDeletePSOMutation
} = PSOapiSlice