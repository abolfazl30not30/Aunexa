import { apiSlice } from "@/redux/api/apiSlice";

export const CategorySlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProduct: builder.query({
      query: () => "inventory/product/find-all",
      providesTags: ["category"],
    }),
    getAllUnit: builder.query({
      query: () => "inventory/unit/find-all",
      providesTags: ["category"],
    }),
    getAllVehicleCategory: builder.query({
      query: () => "vehicle/category/find-all/machine",
      providesTags: ["category"],
    }),
    getAllVehicle: builder.query({
      query: () => "vehicle/machine/find-all",
      providesTags: ["category"],
    }),
    getAllSubOrganization: builder.query({
      query: () => "party/sub-organization/find-all",
      providesTags: ["category"],
    }),
    getAllRole: builder.query({
      query: () => "party/role/find-all",
      providesTags: ["category"],
    }),
    getInventoryBalance: builder.query({
      query: (productId) => `inventory/store-balance/filter?productId=${productId}`,
      providesTags: ["category"],
    }),
  }),
});

export const {
  useLazyGetAllProductQuery,
  useLazyGetAllUnitQuery,
  useLazyGetAllVehicleCategoryQuery,
  useLazyGetAllVehicleQuery,
  useLazyGetAllSubOrganizationQuery,
  useLazyGetAllRoleQuery,
  useLazyGetInventoryBalanceQuery
} = CategorySlice;
