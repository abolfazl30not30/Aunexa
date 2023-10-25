
import {apiSlice} from "@/redux/api/apiSlice";

export const CategorySlice  = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllProduct: builder.query({
            query: () => 'inventory/product/find-all',
            providesTags: ['category']
        }),
        getAllUnit: builder.query({
            query: () => 'inventory/unit/find-all',
            providesTags: ['category']
        }),
        getAllVehicleCategory:builder.query({
            query: () => 'vehicle/category/find-all',
            providesTags: ['category']
        }),
        getAllVehicle:builder.query({
            query: () => 'vehicle/machine/find-all',
            providesTags: ['category']
        }),
    })
})

export const {
    useLazyGetAllProductQuery,
    useLazyGetAllUnitQuery,
    useLazyGetAllVehicleCategoryQuery,
    useLazyGetAllVehicleQuery
} = CategorySlice