import { apiAuthServerSlice } from "@/redux/api/apiAuthServerSlice";

export const CategorySlice = apiAuthServerSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllRoleName: builder.query({
      query: () => "party/role/find-all",
      providesTags: ["categoryRole"],
    }),
  }),
});

export const { useLazyGetAllRoleNameQuery } = CategorySlice;
