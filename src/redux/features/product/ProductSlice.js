
import {apiSlice} from "@/redux/api/apiSlice";

export const ProductSlice  = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllProduct: builder.query({
            query: () => 'inventory/product/find-all',
            providesTags: ['product']
        }),
        getAllUnit: builder.query({
            query: () => 'inventory/unit/find-all',
            providesTags: ['product']
        }),
    })
})

export const {
    useGetAllProductQuery,
    useGetAllUnitQuery
} = ProductSlice