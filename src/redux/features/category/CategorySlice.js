import { apiSlice } from "@/redux/api/apiSlice";

export const CategorySlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProduct: builder.query({
      query: () => "inventory/product/find-all",
      providesTags: ["category"],
    }),
    getAllMachine: builder.query({
      query: () => "golgohar/machine/filter",
      providesTags: ["category"],
    }),
    getAllUnit: builder.query({
      query: () => "inventory/unit/find-all",
      providesTags: ["category"],
    }),
    getAllVehicleCategory: builder.query({
      query: () => "golgohar/category/find-all/machine",
      providesTags: ["category"],
    }),
    getAllVehicleList: builder.query({
      query: () => "golgohar/machine/find-all",
      providesTags: ["category"],
    }),
    getAllSubOrganization: builder.query({
      query: () => "party/sub-organization/find-all/dashboard",
      providesTags: ["category"],
    }),
    getAllRole: builder.query({
      query: () => "party/role/find-all",
      providesTags: ["category"],
    }),
    getInventoryBalance: builder.query({
      query: (productId) =>
        `inventory/store-balance/filter?productId=${productId}`,
      providesTags: ["category"],
    }),
    getAllPaymentMethod: builder.query({
      query: () => "bill/payment-method/find-all",
      providesTags: ["category"],
    }),
    getAllCustomer: builder.query({
      query: () => "bill/invoice/customer/find-all",
      providesTags: ["category"],
    }),
  }),
});

export const {
  useLazyGetAllProductQuery,
  useLazyGetAllMachineQuery,
  useLazyGetAllUnitQuery,
  useLazyGetAllVehicleCategoryQuery,
  useLazyGetAllVehicleListQuery,
  useLazyGetAllSubOrganizationQuery,
  useLazyGetAllRoleQuery,
  useLazyGetAllCustomerQuery,
  useLazyGetAllPaymentMethodQuery,
  useLazyGetInventoryBalanceQuery,
} = CategorySlice;
