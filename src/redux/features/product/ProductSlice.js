
import {apiSlice} from "@/redux/api/apiSlice";

export const ProductSlice  = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllProduct: builder.query({
            query: () => 'inventory/product/list',
            providesTags: ['product']
        }),
    })
})

export const {
    useGetAllProductQuery,
} = ProductSlice