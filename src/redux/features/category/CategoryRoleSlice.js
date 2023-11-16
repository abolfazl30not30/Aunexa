import { apiAuthServerSlice } from "@/redux/api/apiAuthServerSlice";

export const CategorySlice = apiAuthServerSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllRole: builder.query({
      query: () => "roles/find-all",
      providesTags: ["categoryRole"],
    }),
  }),
});

export const { useLazyGetAllRoleQuery } = CategorySlice;
